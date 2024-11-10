import React, { useState } from 'react';
import { supabase } from '../supabase/supabase-client';

export function AddDog() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [story, setStory] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleAddDog = async (e) => {
        e.preventDefault();

        if (!name || !age || !story || !imageFile) {
            setMessage('Prosím vyplňte všechny údaje a nahrajte obrázek.');
            return;
        }

        try {
            const uniqueFileName = `${Date.now()}_${imageFile.name}`;
            const { data: storageData, error: storageError } = await supabase
                .storage
                .from('imagesDogs')
                .upload(`dogs/${uniqueFileName}`, imageFile);

            if (storageError) {
                console.error('Chyba při nahrávání obrázku:', storageError);
                setMessage('Nahrání obrázku selhalo, zkuste to prosím znovu.');
                return;
            }

            const { data, error } = await supabase
                .from('dogs')
                .insert([
                    {
                        name: name,
                        age: age,
                        story: story,
                        imageUrl: uniqueFileName, 
                    },
                ]);

            if (error) {
                console.error('Chyba při přidávání psa:', error);
                setMessage('Přidání psa selhalo, zkuste to prosím znovu.');
            } else {
                setMessage(`Pes "${name}" byl úspěšně přidán.`);
                setName('');
                setAge('');
                setStory('');
                setImageFile(null);
            }
        } catch (error) {
            console.error('Chyba při přidávání psa:', error);
            setMessage('Došlo k chybě, zkuste to prosím znovu.');
        }
    };

    return (
        <>
            <div className="add-dog-card">
            <div className="dog-info">
                <h2>Přidat nového pejska</h2>
                <form onSubmit={handleAddDog}>
                    <div className="form-field">
                        <label><strong>Jméno psa:</strong></label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <label><strong>Věk psa:</strong></label>
                        <input
                            type="text"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <label><strong>Příběh psa:</strong></label>
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

                    <button type="submit">Přidat psa</button>
                </form>

                {message && <p>{message}</p>}
            </div>
            </div>
        </>
    );
}