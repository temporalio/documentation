import React, { useEffect } from 'react';
import Footer from '@theme-original/Footer';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { FeedbackButton } from 'pushfeedback-react';
import { defineCustomElements } from 'pushfeedback/loader';
import 'pushfeedback/dist/pushfeedback/pushfeedback.css';

function FeedbackWidget() {
    const { i18n } = useDocusaurusContext();
    const language = i18n.currentLocale;
    // Replace with your actual project ID
    const projectId = '6c1ptrxbky';

    // Replace with your project supported languages
    const placeholders = {
        en: {
            feedbackButtonText: "Feedback",
            emailPlaceholder: "Enter your email",
            errorMessage: "Please try again later.",
            modalTitleError403: "The request URL does not match the one defined in PushFeedback for this project.",
            modalTitleError404: "We could not find the provided project id in PushFeedback.",
            messagePlaceholder: "Comments",
            modalTitle: "Share your feedback",
            modalTitleError: "Oops!",
            modalTitleSuccess: "Thanks for your feedback!",
            screenshotButtonText: "Take a Screenshot",
            screenshotTopbarText: "SELECT AN ELEMENT ON THE PAGE",
            sendButtonText: "Send",
            ratingPlaceholder: "Was this page helpful?",
            ratingStarsPlaceholder: "How would you rate this page"
        },
        es: {
            feedbackButtonText: "Sugerencias",
            emailPlaceholder: "Ingrese su correo electrónico",
            errorMessage: "Inténtalo de nuevo más tarde.",
            modalTitleError403: "La URL de solicitud no coincide con la definida en PushFeedback para este proyecto.",
            modalTitleError404: "No pudimos encontrar el ID del proyecto proporcionado en PushFeedback.",
            messagePlaceholder: "Comentarios",
            modalTitle: "Danos tu opinión",
            modalTitleError: "¡Vaya!",
            modalTitleSuccess: "¡Gracias por tus comentarios!",
            screenshotButtonText: "Tomar una captura de pantalla",
            screenshotTopbarText: "SELECCIONA UN ELEMENTO EN LA PÁGINA",
            sendButtonText: "Enviar",
            ratingPlaceholder: "¿Fue útil esta página?",
            ratingStarsPlaceholder: "¿Cómo calificarías esta página?"
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            defineCustomElements(window);
        }
    }, []);

    const {
        feedbackButtonText,
        emailPlaceholder,
        errorMessage,
        modalTitleError403,
        modalTitleError404,
        messagePlaceholder,
        modalTitle,
        modalTitleError,
        modalTitleSuccess,
        screenshotButtonText,
        screenshotTopbarText,
        sendButtonText,
        ratingPlaceholder,
        ratingStarsPlaceholder
    } = placeholders[language] || placeholders.en;

    return (
        <div className="feedback-widget">
            <FeedbackButton
                project={projectId}
                email-placeholder={emailPlaceholder}
                error-message={errorMessage}
                modal-title-error-4-0-3={modalTitleError403}
                modal-title-error-4-0-4={modalTitleError404}
                message-placeholder={messagePlaceholder}
                modal-title={modalTitle}
                modal-title-error={modalTitleError}
                modal-title-success={modalTitleSuccess}
                screenshot-button-text={screenshotButtonText}
                screenshot-topbar-text={screenshotTopbarText}
                send-button-text={sendButtonText}
                rating-placeholder={ratingPlaceholder}
                rating-stars-placeholder={ratingStarsPlaceholder}
                button-position="bottom-right"
                button-style="dark"
                modal-position="bottom-right"
            >
            {feedbackButtonText}
            </FeedbackButton>
        </div>
    );
}

export default function FooterWrapper(props) {
    return (
        <>
            <Footer {...props} />
            <FeedbackWidget />
        </>
    );
}
