## LabenuSystem:

As funcionalidades são:

### Criar estudante 
`PUT localhost:3003/student/create` 

![image](https://user-images.githubusercontent.com/61525227/120854075-ff879d80-c552-11eb-893d-430d85232231.png)

---
### Criar docente
`PUT localhost:3003/teacher/create` 

![image](https://user-images.githubusercontent.com/61525227/120853828-a0298d80-c552-11eb-80d2-0455cb848cd1.png)

---
### Criar turma 
`PUT localhost:3003/class/create` 

![image](https://user-images.githubusercontent.com/61525227/120854203-35c51d00-c553-11eb-9ed7-35c0f1795a13.png)

---
### Adicionar estudante na turma
`PUT localhost:3003/class/addStudent` 

![image](https://user-images.githubusercontent.com/61525227/120854370-6e64f680-c553-11eb-8773-3cc07e82d510.png)

---
### Adicionar docente na turma
`PUT localhost:3003/class/addTeacher` 

![image](https://user-images.githubusercontent.com/61525227/120854471-9a807780-c553-11eb-9949-d7d8723f8ce8.png)

---
### Pegar a idade de algum estudante a partir do id
`GET localhost:3003/student/age/:id` 

---
### Exibir estudantes de uma turma 
`GET localhost:3003/students/class/:id` 

---
### Exibir docentes de uma turma
`GET localhost:3003/teacher/class/:id` 


Desenvolvedores: Janis e Nicolas
