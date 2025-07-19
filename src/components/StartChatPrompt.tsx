import { useTranslation } from "react-i18next";

const StartChatPrompt = ({ handleAddNote }: { handleAddNote: () => void }) => {
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

        <div
          className="w-full p-4 rounded-lg cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors ltr:text-left rtl:text-right"
          onClick={handleAddNote}
        >
          <div className="font-medium">{t("create new notebook")}</div>
          <div className="text-sm text-muted-foreground">
            {t("organize your notes by topic")}
          </div>
        </div>
      </div>
    </main>
  );
};

export default StartChatPrompt;
