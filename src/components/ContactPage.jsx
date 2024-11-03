import React from "react";

export function ContactPage() {

    return(
        <>
        <div className="contacts-page">
            <h1>Kontakt na TuliTuli</h1>
            <div className="contacts-offer">
            <p>Provozní doba: <br></br>Po-Pá: 10 - 18 hod<br></br>So-Ne: 8 - 20 hod</p>
            <br></br>
            <h2>TuliTuli Kočky:</h2>
            <p>Adresa: Tulící 1, Štěněcko, 111 11</p>
            <p>Telefon: 111 222 333</p>
            <br></br>
            <h2>TuliTuli Psi:</h2>
            <p>Adresa: Tulící 8, Štěněcko, 111 11</p>
            <p>Telefon: 333 222 111</p>
            <br></br>
            <p>E-mail: tulituli@tulituli.cz</p>
            <p>Instagram: TuliTuli</p>
            <p><strong>Zde je mapa TuliTuli</strong></p>
            <img src="/images/mapa.jpg" alt="Mapa TuliTuli" style={{ width: '600px', height: 'auto'}}/>
            </div>
            </div>
        </>
    )
}