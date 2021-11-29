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
               isedit: false,
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
     //   View    ////////////////////////////////////////
     // ====================================================
     viewFun(id) {
          const { students } = this.state
          console.log(students)
          let stud = students.findIndex((x) => {
               return x.id == id
          })
          document.querySelector("#showItems").innerHTML = `
          <div> ${students[stud].sName}</div>
          <div> ${students[stud].age}</div>
          <div> ${students[stud].class}</div>
          `
     }
     //   delete    ////////////////////////////////////////
     // ====================================================
     deleteFun(id) {
          const { students } = this.state
          let student = students.findIndex((x) => {
               return x.id == id
          })
          students.splice(student, 1)
          this.render()
     }
     //   Update    ////////////////////////////////////////
     // ====================================================

     updateFun(id) {
          const { students } = this.state;
          const student = students.find((x) => x.id === Number(id));
          if (student) {
               document.querySelector("#sName").value = student.sName;
               document.querySelector("#age").value = student.age;
               document.querySelector("#class").value = student.class;
               document.querySelector(".close").innerHTML = "X";
               document.querySelector("#btnSubmit").innerHTML = "update";
               this.setState({
                    ...this.state,
                    newStudent: student,
                    isedit: true
               });
          }

          let none = document.getElementById("showList")
          none.style.display = "block"
     }
     handleAddStudent(event) {
          event.preventDefault()
          const { isedit, newStudent, students } = this.state;
          if (isedit) {
               const index = students.findIndex((x) => x.id === newStudent.id);
               console.log(index)
               if (index > -1) {
                    const studentsState = [...students];
                    studentsState[index] = newStudent;
                    this.setState({
                         ...this.state,
                         students: studentsState,
                         isedit: false,
                         newStudent: { sName: "", age: "", class: "" }
                    })
               }
               document.querySelector("#sName").value = "";
               document.querySelector("#age").value = "";
               document.querySelector("#class").value = "";
               document.querySelector("#btnSubmit").innerHTML = "add";
               this.render();
               return;
          }
          this.setState({
               ...this.state,
               students: [
                    ...this.state.students, {
                         id: Math.floor(Math.random() * 100), ...newStudent
                    },
               ],
          })
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
                   <button class="view" data-my-id=${student.id}-view>view</button>
                   <button class="update" data-my-id="${student.id}-update">Update</button>
                   <button class="delete" data-my-id="${student.id}-delete">Delete</button>
               </div>
           </div>
           `;
               })
               .join("");
          ////////////////functions/////////////////////
          
          let listAll = document.querySelector(".student-buttons")
          listAll.addEventListener("click", (x) => {
               if (x.target.dataset.myId) {
                    let id = x.target.dataset.myId.split("-")
                    if (id[1] === "view") {
                         // console.log("view User")
                         this.viewFun(id[0])
                    }
                    if (id[1] === "update") {
                         // console.log("update User")
                         this.updateFun(id[0])
                    }
                    if (id[1] === "delete") {
                         // console.log("delete User")
                         this.deleteFun(id[0])
                    }
               }
          })
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
     formItems() {
          const form = `
       <div id="showList">
        <form class="style">
        <span class="close">X</span>
            <input type="text" id="sName" name="sName" placeholder="UserName"/>
            <input type="text" id="age" name="age" placeholder="Enter age"/>
            <input type="text" id="class" name="class" placeholder="Enter class"/>
          <button id="btnSubmit" type="submit"> add</button>
        </form>
       </div>
       `
          let formItem = document.getElementById("form-items")
          formItem.innerHTML = form;
     }
}
