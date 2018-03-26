
export const fetchServer = function* (filters, pageinfo, sortinfo) {
	// ajax请求
	const {results, count} = yield fetch("/cars", {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json"
		},
		"body": JSON.stringify({
			"filters": filters,
			"pageinfo": pageinfo,
			"sortinfo": sortinfo
		})
	}).then(data=>data.json())
	return {
		results,
		count
	};
}