import React, { useState, useEffect }  from "react";
import { supabase } from '../supabase/supabase-client';
import { AddGift } from "./AddGift";

export function GiftsPage() {

    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const { data, error } = await supabase
                    .from('gifts') 
                    .select('*'); 

                if (error) {
                    console.error('Chyba při načítání darů:', error);
                } else {
                    setGifts(data);
                }
            } catch (error) {
                console.error('Chyba při načítání dat:', error);
            }
        };

        fetchGifts();
    }, []);


   return(
        <>
        <div className="gifts-page">
            <h1 className="gifts-header">Dary pro TuliTuli</h1>
            <p>Dary, které můžete poskytnou TuliTuli a my za ně budeme velmi vděční</p>
            <p>Pokud chcete útulku TuliTuli něco darovat, zde máte pár tipů, keré jsou aktuálně nejvíce potřeba.</p>
            <p>Pozor, jednotlivé položky se mění v průběhu času dle aktuální potřeby</p>
            <p>Vše nám můžete zasílat na naši adresu, případně rádi převezmeme a poděkujeme osobně.</p>

            <div className="gifts-offer">
                {gifts.map((gift) => (
                    <div key={gift.id} className="gift-card">
                        <img src={gift.imageUrl} alt={gift.name} className="gift-image" />
                        <div className="gift-info">
                            <h2>{gift.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
            <div className="add-gift-container">
            <AddGift></AddGift>
            </div>
            </div>
        </>
    )
}