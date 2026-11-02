const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = "C:\\Users\\EMMANUEL OPOKU\\Documents\\HospitalAnalytics_AgentBuild\\HospitalAnalytics.Report";
const pagesRoot = path.join(root, "definition", "pages");
const reportFile = path.join(root, "definition", "report.json");
const registeredResources = path.join(root, "StaticResources", "RegisteredResources");
const pageSchema = "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/page/2.1.0/schema.json";
const visualSchema = "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.9.0/schema.json";

const colors = {
  navy: "#123B5D",
  navyDark: "#0B2942",
  teal: "#168C8C",
  page: "#EAF1F5",
  sidebar: "#D8E7F0",
  surface: "#FFFFFF",
  border: "#C9D8E2",
  text: "#17324D",
  muted: "#5F7280",
  blue: "#DCECF8",
  mint: "#DDF3F1",
  amber: "#FFF0D5",
  rose: "#FBE2E5",
  lavender: "#E9E3F8"
};

function id(seed) {
  return crypto.createHash("sha1").update(seed).digest("hex").slice(0, 20);
}

function literal(value) {
  return { expr: { Literal: { Value: value } } };
}

function color(value) {
  return { solid: { color: literal(`'${value}'`) } };
}

const kpiIcons = {
  "Total Encounters": { file: "kpi-document-blue.svg", color: "#2F80ED", symbol: "document" },
  "Total Claim Cost": { file: "kpi-coins-green.svg", color: "#2E9B67", symbol: "coins" },
  "Total Payer Coverage": { file: "kpi-shield-gold.svg", color: "#C58A18", symbol: "shield" },
  "Recorded Cost-Coverage Gap": { file: "kpi-gap-rose.svg", color: "#D95D72", symbol: "gap" },
  "Payer Coverage Percentage": { file: "kpi-percent-purple.svg", color: "#7657C8", symbol: "percent" },
  "Zero Coverage Encounters": { file: "kpi-people-blue.svg", color: "#2F80ED", symbol: "people" },
  "Zero Coverage Percentage": { file: "kpi-people-percent-blue.svg", color: "#2F80ED", symbol: "peoplePercent" },
  "Eligible Admissions": { file: "kpi-bed-blue.svg", color: "#2F80ED", symbol: "bed" },
  "30-Day Returns": { file: "kpi-return-purple.svg", color: "#7657C8", symbol: "return" },
  "30-Day Return Rate": { file: "kpi-trend-rose.svg", color: "#D95D72", symbol: "trend" },
  "Average LOS (Days)": { file: "kpi-calendar-purple.svg", color: "#7657C8", symbol: "calendar" },
  "Median LOS (Days)": { file: "kpi-calendar-blue.svg", color: "#2F80ED", symbol: "calendar" }
};

function iconSvg(symbol, stroke) {
  const common = `fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"`;
  const paths = {
    document: `<rect x="17" y="9" width="30" height="46" rx="4" ${common}/><path d="M25 20h14M25 29h14M25 38h9" ${common}/>`,
    coins: `<ellipse cx="22" cy="21" rx="12" ry="6" ${common}/><path d="M10 21v10c0 3 5 6 12 6s12-3 12-6V21" ${common}/><ellipse cx="38" cy="34" rx="12" ry="6" ${common}/><path d="M26 34v10c0 3 5 6 12 6s12-3 12-6V34" ${common}/>`,
    shield: `<path d="M32 8l19 8v14c0 13-8 22-19 27C21 52 13 43 13 30V16l19-8z" ${common}/><path d="M23 31l6 6 12-13" ${common}/>`,
    gap: `<path d="M14 46V23M14 46h37" ${common}/><path d="M22 38l8-10 7 6 12-17" ${common}/><path d="M44 17h5v5" ${common}/>`,
    percent: `<circle cx="20" cy="20" r="6" ${common}/><circle cx="44" cy="44" r="6" ${common}/><path d="M18 46L46 18" ${common}/>`,
    people: `<circle cx="32" cy="18" r="7" ${common}/><circle cx="17" cy="27" r="5" ${common}/><circle cx="47" cy="27" r="5" ${common}/><path d="M19 51c0-10 5-16 13-16s13 6 13 16M5 51c0-7 4-11 10-11M59 51c0-7-4-11-10-11" ${common}/>`,
    peoplePercent: `<circle cx="22" cy="20" r="6" ${common}/><circle cx="45" cy="42" r="6" ${common}/><path d="M19 48L48 16" ${common}/><path d="M9 49c0-8 5-13 13-13 3 0 6 1 8 3" ${common}/>`,
    bed: `<path d="M10 42V20M10 42h44M18 42V28h30c4 0 6 3 6 7v7M18 28v-8h12c4 0 7 3 7 8" ${common}/>`,
    return: `<path d="M47 22H24c-7 0-12 5-12 12s5 12 12 12h17" ${common}/><path d="M35 37l7 9-7 9" ${common}/><path d="M47 22l-7-7" ${common}/>`,
    trend: `<path d="M11 48V31M25 48V24M39 48V17M53 48V10" ${common}/><path d="M8 48h48" ${common}/>`,
    calendar: `<rect x="12" y="14" width="40" height="38" rx="4" ${common}/><path d="M20 9v10M44 9v10M12 25h40M21 34h1M31 34h1M41 34h1M21 43h1M31 43h1" ${common}/>`
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">${paths[symbol]}</svg>\n`;
}

function writeKpiResources() {
  fs.mkdirSync(registeredResources, { recursive: true });
  const report = JSON.parse(fs.readFileSync(reportFile, "utf8"));
  const items = Object.values(kpiIcons).map(({ file, color: stroke, symbol }) => {
    fs.writeFileSync(path.join(registeredResources, file), iconSvg(symbol, stroke));
    return { name: file, path: file, type: "Image" };
  });
  report.resourcePackages = (report.resourcePackages || []).filter(pkg => pkg.name !== "RegisteredResources");
  report.resourcePackages.push({ name: "RegisteredResources", type: "RegisteredResources", items });
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2) + "\n");
}

function source(table) {
  return { SourceRef: { Entity: table } };
}

function column(table, property) {
  return { Column: { Expression: source(table), Property: property } };
}

function measure(table, property) {
  return { Measure: { Expression: source(table), Property: property } };
}

function projection(field, queryRef, nativeQueryRef, active) {
  const result = { field, queryRef, nativeQueryRef };
  if (active !== undefined) result.active = active;
  return result;
}

function colProjection(table, property) {
  return projection(column(table, property), `${table}.${property}`, property, true);
}

function measureProjection(table, property) {
  return projection(measure(table, property), `${table}.${property}`, property);
}

function surfaceObjects(title, fill = colors.surface) {
  const result = {
    background: [{
      properties: {
        show: literal("true"),
        color: color(fill),
        transparency: literal("0D")
      }
    }],
    border: [{
      properties: {
        show: literal("true"),
        color: color(colors.border),
        radius: literal("8D"),
        width: literal("1D")
      }
    }],
    padding: [{
      properties: {
        top: literal("8D"),
        bottom: literal("8D"),
        left: literal("10D"),
        right: literal("10D")
      }
    }],
    subTitle: [{ properties: { show: literal("false") } }]
  };
  if (title) {
    result.title = [{
      properties: {
        show: literal("true"),
        text: literal(`'${title.replace(/'/g, "''")}'`),
        fontColor: color(colors.navy),
        fontSize: literal("11D"),
        bold: literal("true"),
        fontFamily: literal("'Segoe UI Semibold'")
      }
    }];
  }
  return result;
}

function visual(name, type, x, y, width, height, queryState, title, objects, fill = colors.surface) {
  const visual = {
    visualType: type,
    query: { queryState },
    visualContainerObjects: surfaceObjects(title, fill)
  };
  if (objects) visual.objects = objects;
  return {
    $schema: visualSchema,
    name,
    position: { x, y, z: 1000, height, width, tabOrder: 1000 },
    visual
  };
}

function imageVisual(seed, x, y, width, height, file) {
  return {
    $schema: visualSchema,
    name: id(seed),
    position: { x, y, z: 1100, height, width, tabOrder: 1100 },
    visual: {
      visualType: "image",
      objects: {
        general: [{
          properties: {
            imageUrl: {
              expr: {
                ResourcePackageItem: {
                  PackageName: "RegisteredResources",
                  PackageType: 1,
                  ItemName: file
                }
              }
            }
          }
        }]
      },
      visualContainerObjects: {
        background: [{ properties: { show: literal("false") } }],
        border: [{ properties: { show: literal("false") } }],
        padding: [{
          properties: {
            top: literal("0D"),
            bottom: literal("0D"),
            left: literal("0D"),
            right: literal("0D")
          }
        }]
      }
    }
  };
}

function shape(seed, x, y, width, height, fill, z = 0) {
  return {
    $schema: visualSchema,
    name: id(seed),
    position: { x, y, z, height, width, tabOrder: z },
    visual: {
      visualType: "shape",
      objects: {
        shape: [{ properties: { tileShape: literal("'rectangle'") } }],
        fill: [{
          properties: {
            fillColor: color(fill),
            transparency: literal("0D")
          },
          selector: { id: "default" }
        }],
        outline: [{
          properties: { show: literal("false") },
          selector: { id: "default" }
        }]
      },
      visualContainerObjects: {
        background: [{ properties: { show: literal("false") } }],
        border: [{ properties: { show: literal("false") } }],
        padding: [{
          properties: {
            top: literal("0D"),
            bottom: literal("0D"),
            left: literal("0D"),
            right: literal("0D")
          }
        }]
      }
    }
  };
}

function textbox(seed, x, y, width, height, text, fontSize, textColor, z = 20, bold = true) {
  return {
    $schema: visualSchema,
    name: id(seed),
    position: { x, y, z, height, width, tabOrder: z },
    visual: {
      visualType: "textbox",
      objects: {
        general: [{
          properties: {
            paragraphs: [{
              textRuns: [{
                value: text,
                textStyle: {
                  fontFamily: "Segoe UI Semibold",
                  fontSize: `${fontSize}px`,
                  color: textColor,
                  bold
                }
              }],
              horizontalTextAlignment: "left"
            }]
          }
        }]
      },
      visualContainerObjects: {
        background: [{ properties: { show: literal("false") } }],
        border: [{ properties: { show: literal("false") } }],
        padding: [{
          properties: {
            top: literal("0D"),
            bottom: literal("0D"),
            left: literal("0D"),
            right: literal("0D")
          }
        }]
      }
    }
  };
}

function card(seed, x, y, width, measureTable, measureName, fill) {
  const wholeNumberMeasures = new Set([
    "Total Encounters",
    "Eligible Admissions",
    "30-Day Returns"
  ]);
  const precision = wholeNumberMeasures.has(measureName) ? "0L" : "2L";
  const cardVisual = visual(
    id(seed),
    "cardVisual",
    x,
    y,
    width,
    92,
    { Data: { projections: [measureProjection(measureTable, measureName)] } },
    undefined,
    {
      value: [{
        properties: {
          fontSize: literal("20D"),
          fontColor: color(colors.navy),
          labelDisplayUnits: literal("1"),
          labelPrecision: literal(precision)
        },
        selector: { id: "default" }
      }],
      label: [{
        properties: {
          fontSize: literal("9D"),
          fontColor: color(colors.muted),
          textWrap: literal("true"),
          position: literal("'belowValue'")
        },
        selector: { id: "default" }
      }],
      padding: [{
        properties: { paddingUniform: literal("4D") },
        selector: { id: "default" }
      }],
      layout: [{
        properties: { paddingUniform: literal("0D") },
        selector: { id: "default" }
      }],
      accentBar: [{
        properties: {
          show: literal("true"),
          color: color(colors.teal),
          transparency: literal("0D")
        },
        selector: { id: "default" }
      }]
    },
    fill
  );
  const icon = kpiIcons[measureName];
  return [cardVisual, imageVisual(`${seed}-icon`, x + width - 38, y + 18, 24, 24, icon.file)];
}

function topPatientsChart(seed, x, y, width, height) {
  const item = chart(seed, "clusteredBarChart", x, y, width, height, {
    Category: { projections: [colProjection("patients", "Id")] },
    Y: { projections: [measureProjection("inpatient_admission_analysis", "30-Day Returns")] }
  }, "Top Patients by Return Admissions");

  item.visual.query.sortDefinition = {
    sort: [{
      field: measure("inpatient_admission_analysis", "30-Day Returns"),
      direction: "Descending"
    }],
    isDefaultSort: true
  };
  item.filterConfig = {
    filters: [{
      name: id(`${seed}-topn-filter`),
      displayName: "Top 10 patients by return admissions",
      field: column("patients", "Id"),
      type: "TopN",
      filter: {
        Version: 2,
        From: [
          {
            Name: "subquery",
            Expression: {
              Subquery: {
                Query: {
                  Version: 2,
                  From: [
                    { Name: "p", Entity: "patients", Type: 0 },
                    { Name: "a", Entity: "inpatient_admission_analysis", Type: 0 }
                  ],
                  Select: [{
                    Column: {
                      Expression: { SourceRef: { Source: "p" } },
                      Property: "Id"
                    },
                    Name: "field"
                  }],
                  Where: [
                    {
                      Condition: {
                        In: {
                          Expressions: [{
                            Column: {
                              Expression: { SourceRef: { Source: "a" } },
                              Property: "followup_eligible"
                            }
                          }],
                          Values: [[{ Literal: { Value: "true" } }]]
                        }
                      }
                    },
                    {
                      Condition: {
                        In: {
                          Expressions: [{
                            Column: {
                              Expression: { SourceRef: { Source: "a" } },
                              Property: "return_30d_flag"
                            }
                          }],
                          Values: [[{ Literal: { Value: "1L" } }]]
                        }
                      }
                    }
                  ],
                  OrderBy: [{
                    Direction: 2,
                    Expression: {
                      Aggregation: {
                        Expression: {
                          Column: {
                            Expression: { SourceRef: { Source: "a" } },
                            Property: "admission_id"
                          }
                        },
                        Function: 5
                      }
                    }
                  }],
                  Top: 10
                }
              }
            },
            Type: 2
          },
          { Name: "p", Entity: "patients", Type: 0 }
        ],
        Where: [{
          Condition: {
            In: {
              Expressions: [{
                Column: {
                  Expression: { SourceRef: { Source: "p" } },
                  Property: "Id"
                }
              }],
              Table: { SourceRef: { Source: "subquery" } }
            }
          }
        }]
      },
      howCreated: "User"
    }]
  };
  return item;
}

function categoricalFilter(name, table, property, values) {
  const alias = "f";
  return {
    name: id(name),
    field: column(table, property),
    type: "Categorical",
    filter: {
      Version: 2,
      From: [{ Name: alias, Entity: table, Type: 0 }],
      Where: [{
        Condition: {
          In: {
            Expressions: [{
              Column: {
                Expression: { SourceRef: { Source: alias } },
                Property: property
              }
            }],
            Values: values.map(value => [{ Literal: { Value: value } }])
          }
        }
      }]
    },
    howCreated: "User"
  };
}

function eligibleLosChart(seed, x, y, width, height) {
  const item = chart(seed, "clusteredColumnChart", x, y, width, height, {
    Category: { projections: [colProjection("inpatient_admission_analysis", "return_30d_flag")] },
    Y: { projections: [measureProjection("inpatient_admission_analysis", "Average LOS (Days)")] }
  }, "Average LOS by 30-Day Return Status");
  item.filterConfig = {
    filters: [
      categoricalFilter(`${seed}-eligible`, "inpatient_admission_analysis", "followup_eligible", ["true"]),
      categoricalFilter(`${seed}-status`, "inpatient_admission_analysis", "return_30d_flag", ["0L", "1L"])
    ]
  };
  return item;
}

function slicer(seed, x, y, width, height, table, property, title) {
  return visual(
    id(seed),
    "slicer",
    x,
    y,
    width,
    height,
    { Values: { projections: [colProjection(table, property)] } },
    title,
    {
      data: [{ properties: { mode: literal("'Dropdown'") } }],
      header: [{
        properties: {
          show: literal("true"),
          text: literal(`'${title}'`),
          fontColor: color(colors.navy)
        }
      }]
    }
  );
}

function chart(seed, type, x, y, width, height, queryState, title) {
  const objects = type === "donutChart"
    ? {
        labels: [{
          properties: {
            show: literal("true"),
            fontSize: literal("9D"),
            color: color(colors.text),
            labelDisplayUnits: literal("0"),
            labelPrecision: literal("0L"),
            percentageLabelPrecision: literal("1L"),
            labelStyle: literal("'Data value, percent of total'"),
            position: literal("'outside'"),
            overflow: literal("false"),
            background: literal("'off'")
          }
        }],
        legend: [{
          properties: {
            show: literal("true"),
            position: literal("'RightCenter'"),
            fontSize: literal("9D"),
            labelColor: color(colors.text)
          }
        }]
      }
    : {
        labels: [{
          properties: {
            show: literal("true"),
            fontSize: literal("9D"),
            labelDisplayUnits: literal("0")
          }
        }],
        categoryAxis: [{
          properties: {
            fontSize: literal("9D"),
            labelColor: color(colors.text)
          }
        }],
        valueAxis: [{
          properties: {
            fontSize: literal("9D"),
            labelColor: color(colors.text),
            titleFontSize: literal("9D")
          }
        }],
        legend: [{ properties: { show: literal("false") } }]
      };
  return visual(id(seed), type, x, y, width, height, queryState, title, objects);
}

function setAxisTitles(item, categoryTitle, valueTitle, categoryFontSize = "11D", valueFontSize = "11D") {
  const objects = item.visual.objects || {};
  const categoryAxis = objects.categoryAxis?.[0]?.properties;
  const valueAxis = objects.valueAxis?.[0]?.properties;
  if (categoryAxis && categoryTitle) {
    categoryAxis.showAxisTitle = literal("true");
    categoryAxis.titleText = literal(`'${categoryTitle}'`);
    categoryAxis.titleFontSize = literal(categoryFontSize);
    categoryAxis.titleBold = literal("true");
  }
  if (valueAxis && valueTitle) {
    valueAxis.showAxisTitle = literal("true");
    valueAxis.titleText = literal(`'${valueTitle}'`);
    valueAxis.titleFontSize = literal(valueFontSize);
    valueAxis.titleBold = literal("true");
  }
}

function pivotTable(seed, x, y, width, height, rowProjection, valueProjections, title) {
  return visual(
    id(seed),
    "pivotTable",
    x,
    y,
    width,
    height,
    {
      Rows: { projections: [rowProjection] },
      Values: { projections: valueProjections }
    },
    title,
    {
      columnHeaders: [{
        properties: {
          autoSizeColumnWidth: literal("false"),
          columnAdjustment: literal("'fixedWidth'"),
          defaultColumnWidth: literal("100D"),
          customColumnWidth: literal("true"),
          wordWrap: literal("true"),
          fontSize: literal("9D"),
          fontColor: color("#FFFFFF"),
          backColor: color(colors.navy)
        }
      }],
      rowHeaders: [{
        properties: {
          fontSize: literal("9D"),
          fontColor: color(colors.text)
        }
      }],
      values: [{
        properties: {
          fontSize: literal("9D"),
          fontColorPrimary: color(colors.text),
          fontColorSecondary: color(colors.text),
          backColorPrimary: color("#FFFFFF"),
          backColorSecondary: color("#F3F7FA"),
          wordWrap: literal("false")
        }
      }]
    }
  );
}

function page(name, displayName, subtitle, slicers, visuals) {
  const dir = path.join(pagesRoot, name);
  fs.mkdirSync(path.join(dir, "visuals"), { recursive: true });
  fs.writeFileSync(path.join(dir, "page.json"), JSON.stringify({
    $schema: pageSchema,
    name,
    displayName,
    displayOption: "FitToPage",
    height: 720,
    width: 1280,
    objects: {
      background: [{ properties: { color: color(colors.page), transparency: literal("0D") } }],
      outspace: [{ properties: { color: color(colors.page), transparency: literal("0D") } }]
    }
  }, null, 2) + "\n");

  const flattenedVisuals = visuals.flat();
  const decorated = [
    shape(`${name}-header`, 0, 0, 1280, 78, colors.navyDark, 0),
    textbox(`${name}-title`, 28, 12, 700, 38, displayName, 22, "#FFFFFF", 10),
    textbox(`${name}-subtitle`, 28, 50, 1060, 18, subtitle, 10, "#D7E8F2", 10, false),
    shape(`${name}-accent`, 0, 78, 1280, 4, colors.teal, 0),
    shape(`${name}-sidebar`, 16, 96, 190, 608, colors.sidebar, 0),
    textbox(`${name}-filters`, 30, 108, 150, 18, "FILTERS", 10, colors.navy, 10),
    ...slicers,
    ...flattenedVisuals
  ];

  for (const item of decorated) {
    const visualDir = path.join(dir, "visuals", item.name);
    fs.mkdirSync(visualDir, { recursive: true });
    fs.writeFileSync(path.join(visualDir, "visual.json"), JSON.stringify(item, null, 2) + "\n");
  }
}

for (const entry of fs.readdirSync(pagesRoot)) {
  if (entry !== "pages.json") fs.rmSync(path.join(pagesRoot, entry), { recursive: true, force: true });
}

writeKpiResources();

const page1 = "9a7f0d2c1e4b6a8f3d5c";
const page2 = "b4e8c1f7a2d9e6c3b5f0";
const page3 = "c6d1a9f4e7b2c8d0a3f5";

page(page1, "Hospital Activity and Financial Snapshot", "Executive overview of activity, recorded costs, payer coverage, and admissions", [
  slicer("p1-year", 30, 132, 162, 108, "LocalDateTable_3b25f493-92e2-48da-90ed-9179cb8f5738", "Year", "Encounter Year"),
  slicer("p1-class", 30, 252, 162, 142, "encounters", "ENCOUNTERCLASS", "Encounter Class")
], [
  card("p1-total-encounters", 224, 98, 194, "encounters", "Total Encounters", colors.blue),
  card("p1-claim-cost", 430, 98, 194, "encounters", "Total Claim Cost", colors.mint),
  card("p1-coverage", 636, 98, 194, "encounters", "Total Payer Coverage", colors.amber),
  card("p1-gap", 842, 98, 194, "encounters", "Recorded Cost-Coverage Gap", colors.rose),
  card("p1-coverage-pct", 1048, 98, 216, "encounters", "Payer Coverage Percentage", colors.lavender),
  (() => {
    const item = chart("p1-encounters-class", "clusteredBarChart", 224, 210, 330, 454, {
    Category: { projections: [colProjection("encounters", "ENCOUNTERCLASS")] },
    Y: { projections: [measureProjection("encounters", "Total Encounters")] }
    }, "Encounters by Encounter Class");
    setAxisTitles(item, "Encounter Class", "Total Encounters");
    return item;
  })(),
  chart("p1-cost-class", "donutChart", 570, 210, 330, 454, {
    Category: { projections: [colProjection("encounters", "ENCOUNTERCLASS")] },
    Y: { projections: [measureProjection("encounters", "Total Claim Cost")] }
  }, "Total Claim Cost by Encounter Class"),
  (() => {
    const item = chart("p1-average-cost", "clusteredColumnChart", 916, 210, 348, 454, {
    Category: { projections: [colProjection("encounters", "ENCOUNTERCLASS")] },
    Y: { projections: [measureProjection("encounters", "Average Claim Cost")] }
    }, "Average Claim Cost per Encounter");
    setAxisTitles(item, "Encounter Class", "Average Claim Cost");
    return item;
  })()
]);

page(page2, "Inpatient Readmission Patterns", "30-day return admissions, discharge trends, length of stay, and high-utilization patients", [
  slicer("p2-year", 30, 132, 162, 160, "inpatient_admission_analysis", "discharge_year", "Discharge Year")
], [
  card("p2-eligible", 224, 98, 194, "inpatient_admission_analysis", "Eligible Admissions", colors.blue),
  card("p2-returns", 430, 98, 194, "inpatient_admission_analysis", "30-Day Returns", colors.mint),
  card("p2-rate", 636, 98, 194, "inpatient_admission_analysis", "30-Day Return Rate", colors.amber),
  card("p2-avg-los", 842, 98, 194, "inpatient_admission_analysis", "Average LOS (Days)", colors.rose),
  card("p2-med-los", 1048, 98, 216, "inpatient_admission_analysis", "Median LOS (Days)", colors.lavender),
  (() => {
    const item = chart("p2-return-year", "lineChart", 224, 210, 500, 454, {
    Category: { projections: [colProjection("inpatient_admission_analysis", "discharge_year")] },
    Y: { projections: [measureProjection("inpatient_admission_analysis", "30-Day Return Rate")] }
    }, "30-Day Return Rate by Discharge Year");
    setAxisTitles(item, "Discharge Year", "30-Day Return Rate");
    return item;
  })(),
  (() => {
    const item = eligibleLosChart("p2-los-status", 740, 210, 250, 454);
    setAxisTitles(item, "Return Status", "Average LOS (Days)");
    return item;
  })(),
  (() => {
    const item = topPatientsChart("p2-top-patients", 1006, 210, 258, 454);
    setAxisTitles(item, "Patient ID", "30-Day Return Count", "8D", "11D");
    item.visual.objects.categoryAxis[0].properties.fontSize = literal("8D");
    return item;
  })()
]);

page(page3, "Payer Coverage and Recorded Costs", "Coverage, recorded gaps, and financial performance by encounter class and payer", [
  slicer("p3-year", 30, 132, 162, 96, "LocalDateTable_3b25f493-92e2-48da-90ed-9179cb8f5738", "Year", "Encounter Year"),
  slicer("p3-class", 30, 240, 162, 96, "encounters", "ENCOUNTERCLASS", "Encounter Class"),
  slicer("p3-payer", 30, 348, 162, 96, "encounters", "PAYER", "Payer")
], [
  card("p3-total-cost", 224, 98, 194, "encounters", "Total Claim Cost", colors.blue),
  card("p3-total-coverage", 430, 98, 194, "encounters", "Total Payer Coverage", colors.mint),
  card("p3-gap", 636, 98, 194, "encounters", "Recorded Cost-Coverage Gap", colors.rose),
  card("p3-pct", 842, 98, 194, "encounters", "Payer Coverage Percentage", colors.amber),
  card("p3-encounters", 1048, 98, 216, "encounters", "Total Encounters", colors.lavender),
  (() => {
    const item = chart("p3-financial-class", "clusteredColumnChart", 224, 210, 500, 454, {
    Category: { projections: [colProjection("encounters", "ENCOUNTERCLASS")] },
    Y: { projections: [
      measureProjection("encounters", "Total Claim Cost"),
      measureProjection("encounters", "Total Payer Coverage"),
      measureProjection("encounters", "Recorded Cost-Coverage Gap")
    ] }
    }, "Claim Cost, Payer Coverage and Gap by Encounter Class");
    setAxisTitles(item, "Encounter Class", "Recorded Amount");
    return item;
  })(),
  pivotTable("p3-payer-performance", 740, 210, 524, 454,
    colProjection("payers", "NAME"),
    [
      measureProjection("encounters", "Total Encounters"),
      measureProjection("encounters", "Total Claim Cost"),
      measureProjection("encounters", "Total Payer Coverage"),
      measureProjection("encounters", "Recorded Cost-Coverage Gap"),
      measureProjection("encounters", "Payer Coverage Percentage")
    ],
    "Payer Performance"
  )
]);

fs.writeFileSync(path.join(pagesRoot, "pages.json"), JSON.stringify({
  $schema: "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/pagesMetadata/1.1.0/schema.json",
  pageOrder: [page1, page2, page3],
  activePageName: page1
}, null, 2) + "\n");
