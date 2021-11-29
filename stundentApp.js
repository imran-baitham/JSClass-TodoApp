export class StudentApp {
  constructor() {
    this.state = {
      students: [
        {
          id: 1,
          sName: "Zafar",
          age: 30,
          class: "10th",
        },
        {
          id: 2,
          sName: "Ali",
          age: 40,
          class: "12st",
        },
      ],
      newStudent: {
        sName: "",
        age: null,
        class: "",
      },
    };
  }

  setState(newState) {
    this.state = newState;
  }

  handleChange(event) {
    const { newStudent } = this.state;
    this.setState({
      ...this.state, newStudent: {
        ...newStudent,
        [event.target.name]: event.target.value,
      },
    });
  }
  //view//
  // viewFun(id) {
  //   const { students } = this.state;
  //   console.log(students)
  //   let getId = students.findIndex((x) => {
  //     return x.id == id
  //   })
  //   document.getElementById("showView").innerHTML = `
  //   <div class="showItems">${students[getId].sName}</div>
  //   <div class="showItems">${students[getId].age}</div>
  //   <div class="showItems">${students[getId].class}</div>`
  // }
  //delete//
  // viewDelete(id) {
  //   const { students } = this.state;
  //   let viewDlt = students.findIndex((x) => {
  //     return x.id == id
  //   })
  //   students.splice(viewDlt, 1)
  //   this.render();
  // }
  //update//
  // viewUpdate(id) {
  //   const { students } = this.state;
  //   let student = students.find((x) => x.id == id)
  //   if (student) {
  //     this.state.newStudent = student
  //   }
  //   this.formItems(student)
  //   let none = document.getElementById("showList")
  //   none.style.display = "block"
  // }
  handleAddStudent(event) {
    event.preventDefault();
    this.setState({
      ...this.state,
      students: [
        ...this.state.students,
        { id: Math.floor(Math.random() * 100), ...this.state.newStudent },
      ],
    });
    this.render();
  }

  render() {
    const { students } = this.state;
    const studentList = document.querySelector(".stundent-list");
    studentList.innerHTML = students
      .map((student) => {
        return `
        <div class="select">
        <div class="student-item">
                <div class="item">${student.id}</div>
                <div class="item">${student.sName}</div>
                <div class="item">${student.age}</div>
                <div class="item">${student.class}</div>
            </div>
            <div class="student-buttons"> 
                <button class="view" id=${student.id}>view</button>
                <button class="update" id="${student.id}">Update</button>
                <button class="delete" id="${student.id}">Delete</button>
            </div>
            </div>
        `;
      })
      .join("");
    ////////////////functions/////////////////////
    // document.querySelectorAll(".view").forEach((elements) => {
    //   elements.addEventListener("click", () => {
    //     this.viewFun(elements.id)
    //   })

    // })
    // document.querySelectorAll(".delete").forEach((elements) => {
    //   elements.addEventListener("click", () => {
    //     this.viewDelete(elements.id)
    //   })
    // })
    // document.querySelectorAll(".update").forEach((elements) => {
    //   elements.addEventListener("click", () => {
    //     this.viewUpdate(elements.id)
    //   })
    // })
  }
  init() {
    this.render();
    this.formItems()
    const form = document.querySelector("form");
    form.addEventListener("keyup", (event) => {
      this.handleChange(event);
    });

    form.addEventListener("submit", (event) => {
      this.handleAddStudent(event);
      none.style.display = "none"
    });
    const btn = document.getElementById("addTask")
    let none = document.getElementById("showList")
    let show = document.querySelector(".style")
    let nan = document.querySelector(".close")

    btn.addEventListener("click", () => {
      none.style.display = "block"
    })
    none.addEventListener("click", () => {
      none.style.display = "none"
    })
    show.addEventListener("click", (e) => {
      e.stopPropagation()
    })
    nan.addEventListener("click", () => {
      none.style.display = "none"
    })
  }
  formItems(student) {
    const form = `
    <div id="showList">
     <form class="style">
     <span class="close">X</span>
      <h1>${student ? "Update" : "Add"} Student Form</h1>
         <input type="text" value="${student ? student.sName : ""}" name="sName"/>
         <input type="text" value="${student ? student.age : ""}" name="age" />
         <input type="text" value="${student ? student.class : ""}" name="class" />
       <button type="submit"> ${student ? "update" : "Add"}</button>
     </form>
    </div>
    `
    let formItem = document.getElementById("form-items")
    formItem.innerHTML = form;
  }
}
