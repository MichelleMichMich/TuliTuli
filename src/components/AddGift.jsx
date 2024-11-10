import React, { useState } from 'react';
import { supabase } from '../supabase/supabase-client';

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

            // Získání veřejné URL nahraného obrázku
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
            <div className="add-gift-form">
                <h2>Přidat nový dar</h2>
                <form onSubmit={handleAddGift} style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                    <div className="form-field" style={{ marginBottom: '20px' }}>
                        <label><strong>Název daru:</strong></label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                        />
                    </div>

                    <div className="form-field" style={{ marginBottom: '20px' }}>
                        <label><strong>Vyberte obrázek:</strong></label>
                        <input
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            style={{ width: '100%', marginTop: '10px' }}
                        />
                    </div>

                    <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Přidat dar</button>
                </form>

                {message && <p>{message}</p>}
            </div>
        </>
    );
}