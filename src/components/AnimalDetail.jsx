import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import { supabase } from '../supabase/supabase-client';

export function AnimalDetail() {

    const { animalType, id } = useParams();
    const [animal, setAnimal] = useState(null);
    
    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const { data, error } = await supabase
                    .from(animalType) 
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Chyba při načítání zvířete:', error);
                } else {
                    console.log('Fetched animal data:', data);
                    let updatedImages = [];
                    if (data.images && typeof data.images === 'string') {
                        const imagesArray = JSON.parse(data.images.replace(/'/g, '"'));
                        updatedImages = await Promise.all(imagesArray.map(async (image) => {
                            const { data: urlData, error: urlError } = await supabase
                                .storage
                                .from(animalType === 'cats' ? 'imageCats' : 'imagesDogs')
                                .getPublicUrl(image);
                            if (urlError) {
                                console.error('Error generating image URL:', urlError);
                                return null;
                            } else {
                                console.log('Generated image URL:', urlData.publicUrl);
                                return urlData.publicUrl;
                            }
                        }));
                        updatedImages = updatedImages.filter(url => url !== null); 
                    }
                    console.log('Updated images:', updatedImages);
                    setAnimal({ ...data, images: updatedImages });
                }
            } catch (error) {
                console.error('Chyba při načítání dat:', error);
            }
        };

        fetchAnimal();
    }, [animalType, id]);

    if (!animal) {
        return <p>Načítání...</p>;
    }

    return(
    <div className="animalDetail-page ">
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh">
            
                <h1>{animal.name}</h1>
                <p><strong>Věk:</strong> {animal.age}</p>
                <p><strong>Můj příběh:</strong> {animal.story}</p>

                <div className="animal-images">
                    {Array.isArray(animal.images) && animal.images.map((image, index) => (
                        <img key={index} src={image} alt={`${animal.name} ${index + 1}`} className="animal-image"/>
                    ))}
                </div>
        </Box>
        </div>
    );
}