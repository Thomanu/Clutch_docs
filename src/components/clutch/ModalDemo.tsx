import React, { useState } from 'react';
import Modal, { type ModalType } from './Modal';
import Button from './Button';

/** Démo interactive : bouton déclencheur + overlay. Utilisé dans la doc. */
export default function ModalDemo({ type = 'confirmation' }: { type?: ModalType }) {
  const [open, setOpen] = useState(false);

  const config = {
    confirmation: {
      label: 'Ouvrir (confirmation)',
      title: 'Rejoindre le tournoi ?',
      body: 'Tu vas inscrire ton équipe à ce tournoi. Tu pourras te désinscrire jusqu’au début.',
      highlight: 'Nova Esports',
      confirmLabel: 'Confirmer',
    },
    destructive: {
      label: 'Ouvrir (destructive)',
      title: 'Action irréversible',
      body: 'Supprimer cette équipe est définitif.',
      consequences: ['Tous les membres seront retirés', 'Les statistiques seront perdues', 'Les tournois en cours seront annulés'],
      confirmLabel: 'Supprimer',
    },
    success: {
      label: 'Ouvrir (succès)',
      title: 'Check-in confirmé',
      body: 'Ton équipe est prête. Rendez-vous à 20:00 pour le premier match.',
      confirmLabel: 'Fermer',
    },
  }[type];

  return (
    <>
      <Button variant="tertiary" size="md" onClick={() => setOpen(true)}>
        {config.label}
      </Button>
      <Modal
        type={type}
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title={config.title}
        body={config.body}
        highlight={(config as any).highlight}
        consequences={(config as any).consequences}
        confirmLabel={config.confirmLabel}
      />
    </>
  );
}
