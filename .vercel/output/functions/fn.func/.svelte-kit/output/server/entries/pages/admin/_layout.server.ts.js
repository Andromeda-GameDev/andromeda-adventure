import { ref, get } from "firebase/database";
import { d as db } from "../../../chunks/firebase.js";
async function getAllProgress() {
  const progressRef = ref(db, "progress");
  const progressSnapshot = await get(progressRef);
  if (progressSnapshot.exists()) {
    return progressSnapshot.val();
  } else {
    console.log("No data available - getAllProgress");
    return {};
  }
}
const load = async () => {
  async function fetchGroups() {
    const Groups2 = {};
    const groupRef = ref(db, `groups`);
    const groupSnapshot = await get(groupRef);
    if (groupSnapshot.exists()) {
      const allGroupsData = groupSnapshot.val();
      for (const group_uid in allGroupsData) {
        Groups2[group_uid] = {
          group_uid,
          group_id: allGroupsData[group_uid].group_id,
          group_name: allGroupsData[group_uid].group_name,
          professors_ids: [],
          levels: allGroupsData[group_uid].levels
        };
      }
    } else {
      console.log("No data available - allGroups");
    }
    const groupProfessorsRef = ref(db, `group_professors`);
    const snapshot = await get(groupProfessorsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      for (const id in data) {
        const group = Object.values(Groups2).find((group2) => group2.group_id === data[id].group_id);
        if (group) {
          group.professors_ids.push(data[id].professor_id);
        }
      }
    } else {
      console.log("No data available - fetchGroups");
    }
    return Groups2;
  }
  async function getStudents() {
    const studentsRef = ref(db, "users/");
    const studentsSnapshot = await get(studentsRef);
    if (studentsSnapshot.exists()) {
      const studentsData = studentsSnapshot.val();
      const allProgress = await getAllProgress();
      const students = Object.keys(studentsData).map((userId) => {
        const student = studentsData[userId];
        const studentProgress = allProgress[userId] || {};
        return {
          uuid: userId,
          name: student.name,
          lastName: student.last_name,
          email: student.email,
          group_id: student.group,
          progress: studentProgress,
          status: student.status,
          demo: student.demo,
          validated: student.validated
        };
      });
      return students;
    } else {
      console.log("No data available - getStudents");
    }
  }
  async function getProfessors() {
    const professorsRef = ref(db, "professors/");
    const professorsSnapshot = await get(professorsRef);
    if (professorsSnapshot.exists()) {
      const professorsData = professorsSnapshot.val();
      const professors = Object.keys(professorsData).map((professorId) => {
        const professor = professorsData[professorId];
        return {
          uuid: professorId,
          name: professor.name,
          lastName: professor.last_name,
          email: professor.email,
          firstLogTime: professor.firstLogTime,
          status: professor.status
        };
      });
      return professors;
    } else {
      console.log("No data available - getProfessors");
    }
  }
  async function getGlobalValues() {
    const globalRef = ref(db, "globalValues/");
    const globalSnapshot = await get(globalRef);
    if (globalSnapshot.exists()) {
      return globalSnapshot.val();
    } else {
      console.log("No data available - getGlobalValues");
    }
  }
  async function getDBstatus() {
    const statusRef = ref(db, "db_enabled");
    const statusSnapshot = await get(statusRef);
    if (statusSnapshot.exists()) {
      return statusSnapshot.val();
    } else {
      console.log("No data available - getDBstatus");
    }
  }
  return {
    groups: fetchGroups().then((groups) => {
      return groups;
    }),
    students: getStudents().then((students) => {
      return students;
    }),
    globalValues: getGlobalValues().then((globalValues) => {
      return globalValues;
    }),
    professors: getProfessors().then((professors) => {
      return professors;
    }),
    db_status: getDBstatus().then((db_status) => {
      return db_status;
    })
  };
};
export {
  load
};