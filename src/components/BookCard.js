
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const BookCard = ({ title, author, summary }) => {

    const footer = (
        <span>
            <Button label="Reservar" icon="pi pi-check" />
        </span>
    );

    return (
        <div>
            <Card title={title} subTitle={author} style={{ width: '25em' }} footer={footer}>
                <p className="m-0" style={{lineHeight: '1.5'}}>{summary}</p>
            </Card>
        </div>
    )
}

export default BookCard;