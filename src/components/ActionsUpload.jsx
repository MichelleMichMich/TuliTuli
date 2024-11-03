import { Button } from "@mui/material";
import { supabase } from "../supabase/supabase-client";
import { useState } from "react";


function AcitonsUpload() {

    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [file, setFile] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (file === null) {
            console.log("Chyba - není vybraný žádný soubor")
            return
        }

        const {data, error} = await supabase.storage.from('imagesGifts').upload(file.name, file)

        const uploadedFileName = data.fullPath

        const {data2, error2} = await supabase.storage.from('ima').insert({name, age, photo: uploadedFileName})



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

            <div className="form-field">
                
                <input 
                    type="file" 
                    multiple={true} /* zajistí že lze vybrat více souborů*/
                    onChange={handleFileChange}
                />
                </div>

<div className="form-field">
                <label>Jméno</label>
                <input 
                    type="text" 
                    name="age"
                    value={age}
                    
                />
                </div>

                <div className="form-field">
                <label>Věk</label>
                <input 
                    type="file" 
                    multiple={true} /* zajistí že lze vybrat více souborů*/
                    onChange={handleFileChange}
                />
                </div>


                <Button>Odeslat</Button>
            </form>
            <img src="https://wpipfmwoljhuubohxadn.supabase.co/storage/v1/object/public/imagesGifts/Caj.jpg" />
        </>
    )
}