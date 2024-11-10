import React, { useState } from 'react';
import { supabase } from '../supabase/supabase-client';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
                        <Box
                            sx={{
                                '& > :not(style)': { m: 2, width: '100%' },
                                maxWidth: '400px',
                                margin: 'auto',
                                padding: '16px',
                            }}
                        >
                            <TextField
                                label="Jméno"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Věk"
                                variant="outlined"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Popis"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={story}
                                onChange={(e) => setStory(e.target.value)}
                                fullWidth
                            />
                            <div style={{ marginBottom: '16px' }}>
                                <label><strong>Vyberte obrázek:</strong></label>
                                <input
                                    type="file"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    style={{ display: 'block', marginTop: '8px', width: '100%' }}
                                />
                            </div>
                            <Button variant="contained" type="submit" fullWidth>
                                Přidat
                            </Button>
                        </Box>
                    </form>

                    {message && <p>{message}</p>}
                </div>
            </div>
        </>
    );
}