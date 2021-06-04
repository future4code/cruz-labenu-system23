import { Request, Response } from "express";
import app from "./app";
import connection from "./connection";
import moment from "moment";

//string to data moment("22/07/2002", "DD/MM/YYYY").format('YYYY-MM-DD');
//data to string moment("2002-07-22").format('DD/MM/YYYY');

app.put("/teacher/create", async (req: Request, res: Response) => {
  try {
    if (!req.body.nome) {
      throw Error("Está faltando o campo 'nome' no body!");
    }
    if (!req.body.email) {
      throw Error("Está faltando o campo 'email' no body!");
    }
    if (!req.body.dataNasc) {
      throw Error("Está faltando o campo 'dataNasc' no body!");
    }
    await connection.raw(`
    INSERT INTO teacher(nome, email, data_nasc)
    VALUES
    (
      '${req.body.nome}',
      '${req.body.email}',
      '${moment(req.body.dataNasc, "DD/MM/YYYY").format("YYYY-MM-DD")}'
    );
    `);
    res
      .status(200)
      .send({ message: "Professor adicionado no sistema com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: error.message || error.sqlMessage });
  }
});

app.put("/student/create", async (req: Request, res: Response) => {
  try {
    if (!req.body.nome) {
      throw Error("Está faltando o campo 'nome' no body!");
    }
    if (!req.body.email) {
      throw Error("Está faltando o campo 'email' no body!");
    }
    if (!req.body.dataNasc) {
      throw Error("Está faltando o campo 'dataNasc' no body!");
    }

    await connection.raw(`
    INSERT INTO student(nome, email, data_nasc)
    VALUES
    (
      "${req.body.nome}",
      "${req.body.email}",
      "${moment(req.body.dataNasc, "DD/MM/YYYY").format("YYYY-MM-DD")}"
    )
    `);
    res
      .status(200)
      .send({ message: "Aluno adicionado no sistema com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: error.message || error.sqlMessage });
  }
});

app.put("/class/create", async (req: Request, res: Response) => {
  try {
    if (!req.body.nome) {
      throw Error("Por favor, digite um nome");
    }
    if (!req.body.dataInicio) {
      throw Error("Por favor, digite a data inicial do curso");
    }
    if (!req.body.dataFinal) {
      throw Error("Por favor, digite a data final do curso");
    }

    await connection.raw(`
    INSERT INTO class(nome, data_inicio, data_final)
    VALUES
    (
      "${req.body.nome}",
      "${moment(req.body.dataInicio, "DD/MM/YYYY").format("YYYY-MM-DD")}",
      "${moment(req.body.dataFinal, "DD/MM/YYYY").format("YYYY-MM-DD")}"
    );
    `);
    res.status(200).send({ message: "Turma adicionada com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: error.message || error.sqlMessage });
  }
});

app.put("/class/addTeacher", async (req: Request, res: Response) => {
  try {
    if (!req.body.teacherID) {
      throw Error("Por favor, preencha o campo teacherID");
    }
    if (!req.body.classID) {
      throw Error("Por favor, preencha o campo classID");
    }
    await connection.raw(`
    INSERT INTO
      class_teachers (turma_id, professor_id)
    VALUES
      (${req.body.classID}, ${req.body.teacherID});`);
    res.status(200).send({ message: "Professor adicionado com sucesso!" });
  } catch (error) {
    if (
      error.sqlMessage &&
      error.sqlMessage.includes("foreign key constraint fails")
    ) {
      res.status(500).send({ message: "Professor ou turma não encontrados" });
    }
    if (error.sqlMessage && error.sqlMessage.includes("Duplicate")) {
      res.status(500).send({ message: "Esse professor já está nessa turma!" });
    }
    res.status(500).send({ message: error.message || error.sqlMessage });
  }
});
app.put("/class/addStudent", async (req: Request, res: Response) => {
  try {
    if (!req.body.studentID) {
      throw Error("Por favor, preencha o campo studentID");
    }
    if (!req.body.classID) {
      throw Error("Por favor, preencha o campo classID");
    }
    await connection.raw(`
    INSERT INTO
      class_students (turma_id, estudante_id)
    VALUES
      (${req.body.classID}, ${req.body.studentID});`);
    res.status(200).send({ message: "Aluno adicionado com sucesso!" });
  } catch (error) {
    if (error.sqlMessage && error.sqlMessage.includes("Duplicate")) {
      res.status(500).send({ message: "Esse estudante já está em uma turma!" });
    }
    if (
      error.sqlMessage &&
      error.sqlMessage.includes("foreign key constraint fails")
    ) {
      res.status(500).send({ message: "Estudante ou turma não encontrados" });
    }
    res.status(500).send({ message: error.message || error.sqlMessage });
  }
});

app.get("/student/age/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const [result] = await connection.raw(`
      SELECT student.data_nasc FROM student WHERE student.id=${id};
    `);
    if (!result.length) {
      throw Error("Estudante não encontrado!");
    }
    const idade = Number(
      moment(result[0].data_nasc, "YYYY-MM-DD").fromNow().replace(/\D/g, "")
    );
    res.status(200).send({ dataNascimento: idade });
  } catch (error) {
    res.status(500).send({ message: error.message || error.sqlMessage });
  }
});

app.get("/student/class/:id", async (req: Request, res: Response) => {
  try {
    const [result] = await connection.raw(`
    SELECT
      student.nome,
      class.nome as turma
    FROM
      class_students
    JOIN student
    JOIN class
    WHERE
      class.id = ${req.params.id}
      AND class_students.turma_id = ${req.params.id}
      AND class_students.estudante_id = student.id;
    `);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message || error.sqlMessage });
  }
});

app.get("/teacher/class/:id", async (req: Request, res: Response) => {
  try {
    const [result] = await connection.raw(`
      SELECT
        teacher.nome,
        class.nome as turma
      FROM
        class_teachers
        JOIN teacher
        JOIN class
      WHERE
        class.id = ${req.params.id}
        AND class_teachers.turma_id = ${req.params.id}
        AND class_teachers.professor_id = teacher.id;
        `);
      res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message || error.sqlMessage });
  }
});
