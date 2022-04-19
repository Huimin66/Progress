# axios

*Axios* is a promise-based HTTP Client for node.js and the browser. 

# Features 

- Make XMLHttpRequests from the browser

- Make http requests from node.js

- Supports the Promise API

- Intercept request and response

- Transform request and response data

- Cancel requests

- Automatic transforms for JSON data

- Client side support for protecting against XSRF

  # Install

  - use npm

    ```bash
    $ npm install axios
    ```

  - use CDN

    ```html
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    or
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    ```

  # Use Axios

  ## import

  ```js
  const axios = require('axios').default;
  #or
  import axios from 'axios'
  ```

  ## Performing a Get request

  ```js
  // Make a request for a user with a given ID
  axios.get('/user?ID=12345')
    .then(function (response) {
      // handle success
    })
    .catch(function (error) {
      // handle error
    })
  
  // Optionally the request above could also be done as
  axios.get('/user', {
      params: {
        ID: 12345
      }
    })
    .then(function (response) {...})
    .catch(function (error) {...})
  ```

  // Want to use async/await? Add the `async` keyword to your outer function/method.

  ```js
  async function getUser() {
    try {
      const response = await axios.get('/user?ID=12345');
      // handle success
    } catch (error) {
      // handle error
    }
  }
  ```

  ## Performing a Post request

  ```js
  axios.post('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {...})
    .catch(function (error) {...});
  ```

  # axios Api

  > Requests can be made by passing the relevant config to `axios`.

  ## axios(config)

  ```js
  // Send a POST request
  axios({
    method: 'post',
    url: '/user/12345',
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }
  });
  
  // GET request for remote image in node.js
  axios({
    method: 'get',
    url: 'http://bit.ly/2mTM3nY',
    responseType: 'stream'
  })
    .then(function (response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
  
  ```

  ## axios(url[, config])

  ```js
  // Send a GET request (default method)
  axios('/user/12345');
  
  ```

  > For convenience aliases have been provided for all supported request methods.
  >
  > When using the alias methods `url`, `method`, and `data` properties don't need to be specified in config.

  - `axios.request(config)`
  - `axios.get(url[, config])`
  - `axios.delete(url[, config])`
  - `axios.head(url[, config])`
  - `axios.options(url[, config])`
  - `axios.post(url[, data[, config]])`
  - `axios.put(url[, data[, config]])`
  - `axios.patch(url[, data[, config]])`

  # 并发请求

  处理并发请求的助手函数：

  - `axios.all(iterable)`
  - `axios.spread(callback)`

  ```js
  function getUserAccount() {return axios.get('/user/12345');}
  function getUserPermissions() {return axios.get('/user/12345/permissions');}
  复制代码
  //一般写法
  Promise.all([getUserAccount(), getUserPermissions()])
    .then(function (results) {
  	//只有当两个请求都执行完成并且都成功时才触发
      const acct= results[0];
      const permis= results[1];
  });
  复制代码
  //助手函数写法
  axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function (acct,permis) {
      //只有当两个请求都执行完成并且都成功时才触发
    }
  });
  复制代码
  ```

  # 创建实例

  ```
  axios.create([config])
  //使用自定义配置新建一个 axios 实例
  const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
  复制代码
  ```

  ## 实例方法

  指定的配置将与实例的配置合并：

  - `axios#request(config)`
  - `axios#get(url[, config])`
  - `axios#delete(url[, config])`
  - `axios#head(url[, config])`
  - `axios#options(url[, config])`
  - `axios#post(url[, data[, config]])`
  - `axios#put(url[, data[, config]])`
  - `axios#patch(url[, data[, config]])`

  # 请求配置

  这些是创建请求时可以用的配置选项。

  ```js
  {
    url: '/user',		//必需，用于请求的服务器的url
    method: 'get', 	// 请求方法，如果不写，默认为get
  
    // 即将与请求一起发送的 URL 参数，必须是一个无格式对象(plain object)或 URLSearchParams 对象
    params: {
      ID: 12345
    },
    
    //如果url不是一个绝对url，baseURL就会自动加在url前面；
    //该配置便于为 axios 实例的方法传递相对 URL
    baseURL: 'https://some-domain.com/api/',
  
    //允许在向服务器发送前，修改请求数据
    //只能用在 'PUT', 'POST'，'PATCH'和 'DELETE'
    //后面数组中的函数必须返回一个字符串，Buffer实例， ArrayBuffer，FormData 或 Stream
    transformRequest: [function (data, headers) {
      // 对 data 进行任意转换处理
      return data;
    }], 
  
    // 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
      // 对 data 进行任意转换处理
      return data;
    }],
  
    // 自定义请求头
    headers: {'X-Requested-With': 'XMLHttpRequest'},
  
    
    // 负责 `params` 序列化的函数
    paramsSerializer: function (params) {
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
  
    // 作为请求主体被发送的数据
    // 只适用于 'PUT', 'POST', 'DELETE , 和 'PATCH'
    // 在没有设置 `transformRequest`的情况下
    //必须是这些类型之一：string, plain object, ArrayBuffer, ArrayBufferView,URLSearchParams
    data: {
      firstName: 'Fred'
    },
    
    // syntax alternative to send data into the body
    // method post
    // only the value is sent, not the key
    data: 'Country=Brasil&City=Belo Horizonte',
  
    // 指定请求超时的毫秒数，如果请求话费了超过 `timeout` 的时间，请求将被中断，默认为0
    timeout: 1000, 
  
    // 表示跨域请求时是否需要使用凭证，默认为false
    withCredentials: false, 
    
    // 允许自定义处理请求，以使测试更轻松。返回一个 promise 并应用一个有效的响应
    adapter: function (config) {
      /* ... */
    },
  
    // 表示应该使用 HTTP 基础验证并提供凭据
    // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头  
    auth: {
      username: 'janedoe',
      password: 's00pers3cret'
    },
  
    // `表示服务器响应的数据类型
    //  可以是: 'arraybuffer', 'document', 'json', 'text', 'stream'，浏览器专属为blob。默认为json
    responseType: 'json', 
    
    // 指明用于编译响应的编码 只用在nodejs，默认为utf8
    responseEncoding: 'utf8', 
  
    // 用作 xsrf token 的值的cookie的名称，默认为XSRF-TOKEN
    xsrfCookieName: 'XSRF-TOKEN', 
  
    // 承载xsrf token值的http头部名称`，默认为X-XSRF-TOKEN
    xsrfHeaderName: 'X-XSRF-TOKEN', 
  
    // 允许为上传处理进度事件 浏览器专用
    onUploadProgress: function (progressEvent) {
      // 对原生进度事件的处理
    },
  
    // 允许为下载处理进度事件，浏览器专用
    onDownloadProgress: function (progressEvent) {
      // 对原生进度事件的处理
    },
  
    // 定义在nodejs中的允许的响应内容的最大尺寸
    maxContentLength: 2000,
  
    // 定义允许的响应内容的最大尺寸
    maxBodyLength: 2000,
  
    // 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise
    //如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },
  
    // 定义在 node.js 中 follow 的最大重定向数目，如果设置为0，将不会 follow 任何重定向
    maxRedirects: 5, // default
  
    // 定义在nodejs中的 UNIX Socket
    socketPath: null, // default
  
    // 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
  
    // 定义代理服务器的主机名称和端口
    //`auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
    proxy: {
      host: '127.0.0.1',
      port: 9000,
      auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
      }
    },
  
    // 指定用于取消请求的 cancel token
    cancelToken: new CancelToken(function (cancel) {
    }),
  
    // 指明请求体是否应该减压
    //  如果为true，会从所有被减压的响应的响应对象中移除'content-encoding'头部
    decompress: true 
  }
  复制代码
  ```

  # 响应结构

  请求的响应包含以下内容：

  ```js
  {
    data: {},			 // 服务器提供的data
    status: 200,	 	 // 服务器响应的 HTTP 状态码
    statusText: 'OK',  // 服务器响应的HTTP状态信息
    headers: {},		 // 服务器的响应头部
    config: {},		 // 为请求提供的配置信息
    request: {}		 // 生成该响应的请求
  }
  复制代码
  ```

  使用 `then` 时，你将接收下面这样的响应 :

  ```js
  axios.get('/user/12345')
    .then(function (response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    });
  复制代码
  ```

  # 配置默认值

  > 可以指定将被用在各个请求的配置默认值

  ## 全局的axios默认值

  ```js
  axios.defaults.baseURL = 'https://api.example.com';
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  复制代码
  ```

  ## 自定义实例默认值

  ```js
  const instance = axios.create({
    baseURL: 'https://api.example.com'
  });
  // 实例被创建口可修改默认值
  instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  复制代码
  ```

  ## 配置的优先顺序

  配置会以一个优先顺序进行合并：先在 `lib/defaults.js` 找到的库的默认值——>实例的 `defaults` ——>请求的 `config` 参数。后者优先与前者

  ```js
  // 1.使用由库提供的配置的默认值来创建实例,此时超时配置的默认值是 `0`  
  var instance = axios.create();  
    
  // 2.覆写库的超时默认值  
  instance.defaults.timeout = 2500;  
    
  // 3.为已知需要花费很长时间的请求覆写超时设置  
  instance.get('/longRequest', {  
   timeout: 5000  
  });
  复制代码
  ```

  # 拦截器

  在请求或响应被 `then` 或 `catch` 处理前拦截它们

  ```js
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
      // 在请求发送前
      return config;
    }, function (error) {
      // 在请求错误时
      return Promise.reject(error);
    });
  复制代码
  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
      //处理响应数据。状态码在2xx范围内时触发
      return response;
    }, function (error) {
      //处理响应错误。状态码在2xx范围外时触发
      return Promise.reject(error);
    });
  复制代码
  //如果你想在之后移除拦截器：
  const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
  axios.interceptors.request.eject(myInterceptor);
  复制代码
  //给自定义 axios 实例添加拦截器
  const instance = axios.create();
  instance.interceptors.request.use(function () {/*...*/});
  复制代码
  ```

  # 错误处理

  ```js
  axios.get('/user/12345')
    .catch(function (error) {
      if (error.response) {
        // 请求执行完成，服务端返回的状态码在2xx范围外时：
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 请求执行完成，但没有接受到响应时：
        console.log(error.request);//在浏览器指的是XMLHttpRequest实例；在nodejs指的是http.ClientRequest实例
      } else {
        //在创建的请求中发生错误时：
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  复制代码
  ```

  - 可以使用 

    ```
    validateStatus
    ```

     配置选项自定义一个 HTTP 状态码的错误范围。

    ```js
    axios.get('/user/12345', {
      validateStatus: function (status) {
        return status < 500; // 只要状态码少于500就响应成功
      }
    })
    复制代码
    ```

  - 可以使用

    ```
    toJSON
    ```

    方法将 http error转为一个对象来获取更多信息

    ```js
    axios.get('/user/12345')
    .catch(function (error) {
      console.log(error.toJSON());
    });
    复制代码
    ```

  # 取消

  > 使用 cancel token 取消请求。

  - 使用 

    ```
    CancelToken.source
    ```

     工厂方法创建 cancel token：

    ```js
    //创建 cancel token
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    复制代码
    ```

    ```js
    //get
    axios.get('/user/12345', {
      cancelToken: source.token
    }).catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } else {
        // 处理错误
      }
    });
    复制代码
    ```

    ```js
    //post
    axios.post('/user/12345', {
      name: 'new name'
    }, {
      cancelToken: source.token
    })
    复制代码
    ```

    ```js
    // 取消请求，后面的信息是可选的
    source.cancel('Operation canceled by the user.');
    复制代码
    ```

  - 通过传递一个 executor 函数到 

    ```
    CancelToken
    ```

     的构造函数来创建 cancel token

    ```js
    const CancelToken = axios.CancelToken;
    let cancel;
    axios.get('/user/12345', {
      cancelToken: new CancelToken(function executor(c) {
        // executor 函数接收一个 cancel 函数作为参数
        cancel = c;
      })
    });
    复制代码
    ```

    ```js
    // 取消请求
    cancel();
    复制代码
    ```

  # 使用 application/x-www-form-urlencoded 格式

  默认情况下，axios将JavaScript对象序列化为JSON。 当然，你也可以用application / x-www-form-urlencoded格式发送数据：

  ## 浏览器

  - 使用

    `URLSearchParams`

     API。注意，不是所有兰兰器都支持该方法

    ```js
    const params = new URLSearchParams();
    params.append('param1', 'value1');
    params.append('param2', 'value2');
    axios.post('/foo', params);
    复制代码
    ```

  - 使用

    `qs`

    库编码数据

    ```js
    const qs = require('qs');
    axios.post('/foo', qs.stringify({ 'bar': 123 }));
    复制代码
    ```

  ## Node.js

  - 使用

    `querystring`

    模块

    ```js
    const querystring = require('querystring');
    axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
    复制代码
    ```

  - 使用

    url module

     模块的

    URLSearchParams

    ```js
    const url = require('url');
    const params = new url.URLSearchParams({ foo: 'bar' });
    axios.post('http://something.com/', params.toString());
    ```

  


