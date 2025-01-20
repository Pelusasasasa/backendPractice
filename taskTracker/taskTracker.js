const fs = require('fs');
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const json = './tasks.json';
const tasks = [];

if(!fs.existsSync(json)){
  fs.createWriteStream('tasks.json');
}else{
  const data = fs.readFileSync(json, 'utf-8');
  if (data) {
    let aux = JSON.parse(data);
    tasks.push(...aux)
  }
};

const agregarTarea = (texto) => {
  const nuevaTarea = {
    id: tasks.length + 1,
    descripcion: texto,
    status: 'todo',
    createdAt: new Date(),
    updateAt: new Date()
  };

  //Agregamos la tarea al arreglo de tareas temporal
  tasks.push( nuevaTarea );

  //Agreagamos la tarea al archivo
  fs.writeFileSync(json, JSON.stringify(tasks, null, 2));
  
};

const mostrarTareas = () => {
  console.log(tasks);
};

const args = process.argv.slice(2);
const commando = args[0];
const texto = args[1];


switch (commando) {
  case 'add':
    agregarTarea(texto);
    break;
  case 'list':
    mostrarTareas()
  default:
    break;
}


// // Mostrar el menú
// const showMenu = () => {
//   console.log(`
// Task Tracker CLI
// -----------------
// 1. Ver tareas
// 2. Agregar tarea
// 3. Marcar tarea como completada
// 4. Eliminar tarea
// 5. Salir
// `);
//   rl.question("Seleccione una opción: ", handleMenu);
// };

// // Manejar las opciones del menú
// const handleMenu = (option) => {
//   switch (option.trim()) {
//     case "1":
//       viewTasks();
//       break;
//     case "2":
//       addTask();
//       break;
//     case "3":
//       completeTask();
//       break;
//     case "4":
//       deleteTask();
//       break;
//     case "5":
//       console.log("¡Gracias por usar el rastreador de tareas!");
//       rl.close();
//       break;
//     default:
//       console.log("Opción no válida. Inténtelo de nuevo.");
//       showMenu();
//   }
// };

// // Ver tareas
// const viewTasks = () => {
//   if (tasks.length === 0) {
//     console.log("No hay tareas disponibles.");
//   } else {
//     console.log("\nTareas:");
//     tasks.forEach((task, index) => {
//       const status = task.completed ? "✔️ Completada" : "❌ Pendiente";
//       console.log(`${index + 1}. [${status}] ${task.name}`);
//     });
//   }
//   showMenu();
// };

// // Agregar tarea
// const addTask = () => {
//   rl.question("Ingrese el nombre de la nueva tarea: ", (taskName) => {
//     tasks.push({ name: taskName, completed: false });
//     console.log(`Tarea "${taskName}" agregada.`);
//     showMenu();
//   });
// };

// // Completar tarea
// const completeTask = () => {
//   rl.question("Ingrese el número de la tarea para marcar como completada: ", (num) => {
//     const index = parseInt(num) - 1;
//     if (tasks[index]) {
//       tasks[index].completed = true;
//       console.log(`Tarea "${tasks[index].name}" marcada como completada.`);
//     } else {
//       console.log("Número de tarea inválido.");
//     }
//     showMenu();
//   });
// };

// // Eliminar tarea
// const deleteTask = () => {
//   rl.question("Ingrese el número de la tarea para eliminar: ", (num) => {
//     const index = parseInt(num) - 1;
//     if (tasks[index]) {
//       const removedTask = tasks.splice(index, 1);
//       console.log(`Tarea "${removedTask[0].name}" eliminada.`);
//     } else {
//       console.log("Número de tarea inválido.");
//     }
//     showMenu();
//   });
// };

// // Iniciar el programa
// console.log("¡Bienvenido al rastreador de tareas!");
// showMenu();
// ¿Cómo usar este programa?
// Guarda este código en un archivo llamado taskTracker.js.

// Asegúrate de tener instalado Node.js en tu máquina.

// Ejecuta el programa con el comando:

// bash
// Copiar
// Editar
// node taskTracker.js
// Sigue las instrucciones en pantalla para agregar, ver, completar o eliminar tareas.

// Características del programa:
// Agregar tarea: Puedes agregar nuevas tareas al rastreador.
// Ver tareas: Muestra todas las tareas con su estado actual (pendiente o completada).
// Completar tarea: Cambia el estado de una tarea a "completada".
// Eliminar tarea: Permite eliminar una tarea de la lista.
// Salir: Cierra la aplicación.
// Este es un proyecto básico que puedes expandir más adelante, por ejemplo, guardando las tareas en un archivo JSON para persistencia de datos. 😊