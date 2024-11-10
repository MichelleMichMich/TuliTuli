import React, { useState } from 'react';
import { supabase } from '../supabase/supabase-client';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function AddGift() {
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleAddGift = async (e) => {
        e.preventDefault();

        if (!name || !imageFile) {
            setMessage('Prosím vyplňte všechny údaje a nahrajte obrázek.');
            return;
        }

        try {
            const { data: storageData, error: storageError } = await supabase
                .storage
                .from('imagesGifts') 
                .upload(`gifts/${imageFile.name}`, imageFile);

            if (storageError) {
                console.error('Chyba při nahrávání obrázku:', storageError);
                setMessage('Nahrání obrázku selhalo, zkuste to prosím znovu.');
                return;
            }

            const { data: urlData, error: urlError } = supabase
                .storage
                .from('imagesGifts')
                .getPublicUrl(`gifts/${imageFile.name}`);

            if (urlError) {
                console.error('Chyba při získávání URL obrázku:', urlError);
                setMessage('Nepodařilo se získat URL obrázku.');
                return;
            }

            const publicURL = urlData.publicUrl;

            if (publicURL) {
                const { data, error } = await supabase
                    .from('gifts') 
                    .insert([
                        {
                            name: name,
                            imageUrl: publicURL, 
                        },
                    ]);

                if (error) {
                    console.error('Chyba při přidávání daru:', error);
                    setMessage('Přidání daru selhalo, zkuste to prosím znovu.');
                } else {
                    setMessage(`Dar ${name} byl úspěšně přidán.`);
                    setName(''); 
                    setImageFile(null);
                }
            } else {
                setMessage('URL obrázku není platná, zkuste to prosím znovu.');
            }

        } catch (error) {
            console.error('Chyba při přidávání daru:', error);
            setMessage('Došlo k chybě, zkuste to prosím znovu.');
        }
    };

    return (
        <>
        <div className="add-gift-card">
                <div className="add-gift-form">
                    <h2>Přidat nový dar</h2>
                    <form onSubmit={handleAddGift}>
                        <Box
                            sx={{ '& > :not(style)': { m: 2, width: '100%' }, maxWidth: '400px', margin: 'auto', padding: '16px' }}>
                            <TextField
                                label="Název"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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