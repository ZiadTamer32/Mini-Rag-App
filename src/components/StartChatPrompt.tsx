import { useTranslation } from "react-i18next";

const StartChatPrompt = () => {
  const { t } = useTranslation();
  return (
    <main className="flex items-center justify-center p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          📝 {t("welcome to Mini-Rag-App")}
        </h2>
        <p className="text-muted-foreground mb-6">
          {t(
            "create your first notebook or note to get started with AI-powered note-taking"
          )}
        </p>
      </div>
    </main>
  );
};

export default StartChatPrompt;
