export default function request(method, path, headers, async, onResponse) {
	const xhr = new XMLHttpRequest();

	xhr.open(method, path, async);
	headers.forEach(header => xhr.setRequestHeader(header.name, header.value));

	if (async) {
		xhr.onreadystatechange = function() {
			if (xhr.readyState !== 4) return;

			if (xhr.status !== 200) {
				console.log(`Error occurred during getting messages: ${request.status}, ${request.statusText}.`);
			} else {
				if (onResponse) onResponse(xhr.responseText);
			}
		}
	}

	return xhr;
}