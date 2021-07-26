export class Todo {

  static fromJson({ id, tarea, completado, creado }) {

    const temporalTodo = new Todo(tarea);
    temporalTodo.id = id;
    temporalTodo.completado = completado;
    temporalTodo.creado = creado;

    return temporalTodo;
  }

  constructor(tarea) {

    this.tarea = tarea;
    this.id = new Date().getTime();
    this.completado = false;
    this.creado = new Date();

  }

  imprimirClase() {
    console.log(`${this.tarea} - ${this.id}`)
  }

}