import { getDatabase, ref, get, query, orderByChild, equalTo } from "firebase/database";
import type { Group, Media, Solver, download } from "../../types"

const db = getDatabase();

async function getGroupsByIds(groups: { [key: string]: Group}) {
    const groupRef = ref(db, `groups`);
    const groupSnapshot = await get(groupRef);
    if (groupSnapshot.exists()){
        const data = groupSnapshot.val();
        for(const key in groups){
            for (const group_id in data){
                if(data[group_id].group_id === groups[key].group_id){
                    groups[key].group_uid = group_id;
                    groups[key].group_name = data[group_id].group_name;
                    groups[key].levels = data[group_id].levels;
                }
            }
        }
    } else {
        console.log("No data available - getGroupsByIds");
    }

    return groups;
}

async function getAllProgress() {
    const progressRef = ref(db, 'progress');
    const progressSnapshot = await get(progressRef);

    if (progressSnapshot.exists()) {
        return progressSnapshot.val();
    } else {
        console.log("No data available - getAllProgress");
        return {};
    }
}

export const load = async () => {
    const Groups: { [key: string]: Group} = {}
    //const students : Student[] = []
    async function fetchGroups(){
        const groupProfessorsRef = ref(db, `group_professors`);
        const snapshot = await get(groupProfessorsRef);
        if (snapshot.exists()){
            const data = snapshot.val();
            for (const id in data){
                if(Groups[data[id].group_id]){
                    Groups[data[id].group_id].professors_ids.push(data[id].professor_id);
                } else {
                    Groups[data[id].group_id] = {
                        group_uid: "",
                        group_id: data[id].group_id,
                        group_name: "",
                        professors_ids: [data[id].professor_id],
                        levels: {}
                    }
                }
            }
        } else {
            console.log("No data available - fetchGroups");
        }

        await getGroupsByIds(Groups);

        return Groups;
    }

    async function getStudents(){
        const studentsRef = ref(db, 'users/');
        const activeStudentsQuery = query(studentsRef, orderByChild('status'), equalTo('active'));
        const studentsSnapshot = await get(activeStudentsQuery);
    
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
                };
            });
    
            return students;
        } else {
            console.log("No data available - getStudents");
        }
    }

    async function getMedia(){
        const data: Media = {
            levelSolvers: [],
            galactic_marker: "",
            global_tolerance: 0,
            downloads: []
        }

        const downloadRef = ref(db, 'download/');
        const downloadSnapshot = await get(downloadRef);

        if (downloadSnapshot.exists()){
            const downloadData = downloadSnapshot.val();
            for(const key in downloadData){
               if(key !== "galactic_marker"){
                    const download: download = {
                        platform: key,
                        guide: downloadData[key].guide,
                        url: downloadData[key].url
                    }

                    data.downloads.push(download);
               } else {
                   data.galactic_marker = downloadData[key];
               }

            }
        }

        const globalRef = ref(db, 'globalValues/');
        const globalSnapshot = await get(globalRef);
        if (globalSnapshot.exists()){
            const globalData = globalSnapshot.val();
            data.global_tolerance = globalData.toleranceValue;
        }

        const solversRef = ref(db, 'levels/');
        const solversSnapshot = await get(solversRef);
        if (solversSnapshot.exists()){
            const solversData = solversSnapshot.val();
            for(const key in solversData){
                const solver: Solver = {
                    level_id: key,
                    url: solversData[key].url
                }

                data.levelSolvers.push(solver);
            }
        }

        return data;
    }

    return {
        groups : fetchGroups().then((groups) => {
            return groups;
        }),

        students: getStudents().then((students) => {
            return students;
        }),

        media: getMedia().then((media) => {
            return media;
        })
    }
}