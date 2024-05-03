import axios from "axios";
import { BASE_URL } from "../../constants/urlConstants";

export async function fetchStatisticsByIndustries(companyId) {
  const response = await axios.get(
    `${BASE_URL}/companies/${companyId}/statistics/industries`
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.statisticsByIndustries;
}

export async function fetchStatisticsByApplies(companyId) {
  const response = await axios.get(
    `${BASE_URL}/companies/${companyId}/statistics/applies`
  );

  if (response.data.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data.data.statisticsByApply;
}
