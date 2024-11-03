import { Button } from "@mui/material";
import { supabase } from "../supabase/supabase-client";
import { useState } from "react";


function MinimalUpload() {

    const [file, setFile] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (file === null) {
            console.log("Chyba - není vybraný žádný soubor")
            return
        }




        const {data, error} = await supabase.storage.from('imagesGifts').upload(file.name, file)

        console.log(data)
        console.log(error)

    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        console.log(e.target.files[0])
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    multiple={true} /* zajistí že lze vybrat více souborů*/
                    onChange={handleFileChange}
                />
                <Button>Odeslat</Button>
            </form>
            <img src="https://wpipfmwoljhuubohxadn.supabase.co/storage/v1/object/public/imagesGifts/Caj.jpg" />
        </>
    )
}