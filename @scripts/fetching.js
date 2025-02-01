export default async function fetchData(address) {
    const response = await fetch(address).then((res) => res.json());
    return response;
}
