import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}
export class ReadOnlyApiService extends BaseApiService {
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }

  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");
    return data;
  }

  async getMe() {
    const { data } = await axios.get("whoAmI");
    return data;
  }
}

// export class OrderApiService extends CrudApiService {
//   constructor(notifier) {
//     super("orders", notifier);
//   }
//
//   // // Нормализация задачи, полученной с сервера
//   // _normalize(task) {
//   //   return {
//   //     ...task,
//   //     ticks: task.ticks ? task.ticks : [],
//   //     dueDate: task.dueDate ? new Date(task.dueDate) : null,
//   //     status: task.statusId ? taskStatuses[task.statusId] : '',
//   //     timeStatus: TaskApiService.getTimeStatus(task.dueDate)
//   //   };
//   // }
//
//   // // Форматирование данных перед отправкой на сервер (убираем лишнее)
//   // _createRequest(task) {
//   //   const { ticks, comments, status, timeStatus, user, ...request } = task;
//   //   return request;
//   // }
//
//   // // Получение списка задач
//   // async query(config = {}) {
//   //   const tasks = await super.query(config);
//   //   return tasks.map(task => this._normalize(task));
//   // }
//
//   // // Создание новой задачи
//   // async post(task) {
//   //   const { data: newTask } =
//   //     await axios.post('tasks', this._createRequest(task));
//   //   return this._normalize(newTask);
//   // }
// }
