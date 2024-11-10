import React, { useState } from 'react';
import { supabase } from '../supabase/supabase-client';

export function AddAction() {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [story, setStory] = useState('');
    const [message, setMessage] = useState('');

    const handleAddAction = async (e) => {
        e.preventDefault();

        if (!name || !date || !timeFrom || !timeTo || !imageFile || !story) {
            setMessage('Prosím vyplňte všechny údaje a nahrajte obrázek.');
            return;
        }

        try {
            const uniqueFileName = `${Date.now()}_${imageFile.name}`;
            const { data: storageData, error: storageError } = await supabase
                .storage
                .from('imagiesActions')
                .upload(`actions/${uniqueFileName}`, imageFile);

            if (storageError) {
                console.error('Chyba při nahrávání obrázku:', storageError);
                setMessage('Nahrání obrázku selhalo, zkuste to prosím znovu.');
                return;
            }

            const { data: urlData, error: urlError } = supabase
                .storage
                .from('imagiesActions')
                .getPublicUrl(`actions/${uniqueFileName}`);

            if (urlError) {
                console.error('Chyba při získávání URL obrázku:', urlError);
                setMessage('Nepodařilo se získat URL obrázku.');
                return;
            }

            const publicURL = urlData.publicUrl;

            if (publicURL) {
                const { data, error } = await supabase
                    .from('actions')
                    .insert([
                        {
                            name: name,
                            date: date,
                            time_from: timeFrom,
                            time_to: timeTo,
                            imageUrl: publicURL,
                            story: story,
                        },
                    ]);

                if (error) {
                    console.error('Chyba při přidávání akce:', error);
                    setMessage('Přidání akce selhalo, zkuste to prosím znovu.');
                } else {
                    setMessage(`Akce "${name}" byla úspěšně přidána.`);
                    setName('');
                    setDate('');
                    setTimeFrom('');
                    setTimeTo(''); 
                    setImageFile(null);
                    setStory(''); 
                }
            } else {
                setMessage('URL obrázku není platná, zkuste to prosím znovu.');
            }

        } catch (error) {
            console.error('Chyba při přidávání akce:', error);
            setMessage('Došlo k chybě, zkuste to prosím znovu.');
        }
    };

    return (
        <>
            <div className="add-action-form">
                <h2>Přidat novou akci</h2>
                <form onSubmit={handleAddAction} style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                    <div className="form-field" style={{ marginBottom: '20px' }}>
                        <label><strong>Název akce:</strong></label>
                        <input
                            type="text"
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                        />
                    </div>

                    <div className="form-field" style={{ marginBottom: '20px' }}>
                        <label><strong>Datum konání:</strong></label>
                        <input
                            type="date"
                            value={date || ''}
                            onChange={(e) => setDate(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                        />
                    </div>

                    <div className="form-field" style={{ marginBottom: '20px' }}>
                        <label><strong>Čas začátku (time_from):</strong></label>
                        <input
                            type="time"
                            value={timeFrom || ''}
                            onChange={(e) => setTimeFrom(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                        />
                    </div>

                    <div className="form-field" style={{ marginBottom: '20px' }}>
                        <label><strong>Čas konce (time_to):</strong></label>
                        <input
                            type="time"
                            value={timeTo || ''}
                            onChange={(e) => setTimeTo(e.target.value)}
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

                    <div className="form-field" style={{ marginBottom: '20px' }}>
                        <label><strong>Popis akce:</strong></label>
                        <textarea
                            value={story || ''}
                            onChange={(e) => setStory(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                        />
                    </div>

                    <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Přidat akci</button>
                </form>

                {message && <p>{message}</p>}
            </div>
        </>
    );
}