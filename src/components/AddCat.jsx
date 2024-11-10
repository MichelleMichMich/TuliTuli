import React, { useState } from 'react';
import { supabase } from '../supabase/supabase-client';

export function AddCat() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [story, setStory] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleAddCat = async (e) => {
        e.preventDefault();

        if (!name || !age || !story || !imageFile) {
            setMessage('Prosím vyplňte všechny údaje a nahrajte obrázek.');
            return;
        }

        try {
            const uniqueFileName = `${Date.now()}_${imageFile.name}`;
            const { data: storageData, error: storageError } = await supabase
                .storage
                .from('imageCats')
                .upload(`cats/${uniqueFileName}`, imageFile);

            if (storageError) {
                console.error('Chyba při nahrávání obrázku:', storageError);
                setMessage('Nahrání obrázku selhalo, zkuste to prosím znovu.');
                return;
            }

            const { data, error } = await supabase
                .from('cats')
                .insert([
                    {
                        name: name,
                        age: age,
                        story: story,
                        imageUrl: uniqueFileName, 
                    },
                ]);

            if (error) {
                console.error('Chyba při přidávání kočky:', error);
                setMessage('Přidání kočky selhalo, zkuste to prosím znovu.');
            } else {
                setMessage(`Kočka "${name}" byla úspěšně přidána.`);
                setName('');
                setAge('');
                setStory('');
                setImageFile(null);
            }
        } catch (error) {
            console.error('Chyba při přidávání kočky:', error);
            setMessage('Došlo k chybě, zkuste to prosím znovu.');
        }
    };

    return (
        <>
            <div className="add-cat-card">
            <div className="cat-info">
                <h2>Přidat novou kočičku</h2>
                <form onSubmit={handleAddCat}>
                    <div className="form-field">
                        <label><strong>Jméno kočky:</strong></label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <label><strong>Věk kočky:</strong></label>
                        <input
                            type="text"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <label><strong>Příběh kočky:</strong></label>
                        <textarea
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <label><strong>Vyberte obrázek:</strong></label>
                        <input
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    </div>

                    <button type="submit">Přidat kočku</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
        </>
    );
}