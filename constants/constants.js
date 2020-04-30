const constants = {
  prepareJSONResponse: prepareJSONResponse,
};

function prepareJSONResponse(res, status_code, response_code, response_data) {
  let data_result = {};

  data_result["transaction_response_code"] = response_code;
  data_result["data"] = response_data;

  return res.status(status_code).json(data_result);
}

module.exports = constants;
