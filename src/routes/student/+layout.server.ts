import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import type { Media, download } from "../../types"
import { db } from "../../lib/firebase/firebase"

export const load = async () => {
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
    
        return data;
    }

    return {
        media: getMedia().then((media) => {
            return media;
        })
    }
}