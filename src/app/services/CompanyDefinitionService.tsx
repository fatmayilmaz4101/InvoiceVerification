export const CompanyDefinitionService = {
  getCompanyDefinition() {
    return fetch("/data/company-definition.json", {
      headers: { "Cache-Control": "no-cache" },
    })
      .then((response) => response.json())
      .then((data) => data as Services.CompanyDefinition[]);
  },
};
