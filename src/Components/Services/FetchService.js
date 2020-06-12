class Fetch {
  static instance = null;

  constructor() {
    if (Fetch.instance) {
      return Fetch.instance;
    }

    Fetch.instance = this;
  }
  async ReaquestData(URL, method) {
    let response = await fetch(URL, { method: method });
    let data = await response.json();
    return data;
  }
  get(URL) {
    return this.ReaquestData(URL, "GET");
  }
  put(URL) {
    return this.ReaquestData(URL, "PUT");
  }
  post(URL) {
    return this.ReaquestData(URL, "POST");
  }
  delete(URL) {
    return this.ReaquestData(URL, "DELETE");
  }
}
const fetchService = new Fetch();
export default fetchService;
