import React, { useState, useEffect }  from "react";

export function GiftsPage() {

    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/gifts')
        .then(response => response.json())
        .then(data => setGifts(data));
    }, []);

   return(
        <>
            <h1>Dary pro TuliTuli</h1>
            <p>Dary, které můžete poskytnou TuliTuli a my za ně budeme velmi vděční</p>
            <p>Pokud chcete útulku TuliTuli něco darovat, zde máte pár tipů, keré jsou aktuálně nejvíce potřeba.</p>
            <p>Pozor, jednotlivé položky se mění v průběhu času dle aktuální potřeby</p>
            <p>Vše nám můžete zasílat na naši adresu, případně rádi převezmeme a poděkujeme osobně.</p>

            <div className="gift-forUs">
                {gifts.map((gift) => (
                    <div key={gift.id} className="gift-card">
                        <img src={gift.imageUrl} alt={gift.name} className="gift-image" />
                        <div className="gift-info">
                            <h2>{gift.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}