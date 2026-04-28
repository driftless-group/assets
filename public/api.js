
class API {
  constructor(options={}) {
    Object.assign(this, options);
  }

  constructHeaders(options={}) {
    if (options.Accept != undefined) {
      options.Accept = 'application/json';
    }

    if (this.token != undefined) {
      options.Authorization = "Bearer " + this.token;
    }
    
    return options;
  }

  get(endpoint, query={}) {
    var self = this;

    return new Promise(async(resolve) => {
      try {
        query = new URLSearchParams(query);
        var url = [self.root, endpoint].join('') + "?" + query.toString()

        const response = await fetch(url, {
          method: 'GET',
          headers: self.constructHeaders()
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        resolve(data);
      } catch (error) {
        resolve(error);
      }
    })


  }

  post(endpoint, data={}) {
    var reply, self = this;
    var url = [self.root, endpoint].join('')

    return new Promise(async(resolve) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: self.constructHeaders(),
        body: JSON.stringify(data)
      });

      if (response.ok) {
        var reply = await response.json(); // Only if the server returns a body
      }

      resolve(reply);

    })
  }

  put(endpoint, data={}) {
    var self = this;
    
    return new Promise(async(resolve) => {
      const url = [self.root, endpoint].join('');

      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: self.constructHeaders(),
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        resolve(result);
      } catch (error) {
        resolve(error);
      }


    })
  }

  delete(endpoint) {
    var self = this, data;

    return new Promise(async(resolve) => {
      var url = [self.root, endpoint].join('');

      const response = await fetch(url, {
        method: 'DELETE',
        headers: self.constructHeaders()
      });

      if (response.ok) {
        data = await response.json();
      }

      resolve(data);
    })
  }
}
