import BackButton from "@/components/BackButton";
import HelpCard from "@/components/HelpCard";
import PageHeading from "@/components/PageHeading";

import {
  ComputerDesktopIcon,
  CpuChipIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";

export default function HelpPage() {
  return (
    <main className="container relative mx-auto px-4 pt-4">
      <div className="relative flex items-center">
        <BackButton />

        <PageHeading className="absolute left-1/2 -translate-x-1/2 transform">
          <h2>Hilfe</h2>
        </PageHeading>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        <HelpCard
          icon={<CpuChipIcon />}
          title="Was sind Deepfakes?"
          description="Deepfakes sind gefälschte Videos, die mit KI-Technologien erstellt werden. Sie können sehr realistisch wirken und werden häufig für betrügerische Zwecke eingesetzt."
          color="blue"
        />
        <HelpCard
          icon={<DocumentTextIcon />}
          title="Wie funktioniert das Spiel?"
          description="Du siehst zwei Videos nebeneinander. Eines davon ist echt, das andere ein Deepfake. Deine Aufgabe ist, das echte Video zu erkennen und darauf zu klicken."
          color="green"
        />
        <HelpCard
          icon={<EyeIcon />}
          title="Woran erkenne ich Deepfakes?"
          description="Typische Anzeichen sind die Qualität des Videos, die Augen, die Gesichtsdetails, die Mimik, die Bewegungen und die Beleuchtung. Man muss sich die Videos genau angucken."
          color="purple"
        />
        <HelpCard
          icon={<FolderIcon />}
          title="Woher kommen die Videos?"
          description={
            <>
              Die Videos stammen aus dem{" "}
              <a
                href="https://github.com/yuezunli/celeb-deepfakeforensics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline transition duration-200 hover:text-blue-800 hover:no-underline"
              >
                Celeb-DF-v2
              </a>{" "}
              Datensatz, der echte und gefälschte Videos von Prominenten
              enthält. Er wird häufig für Deepfake-Forschung verwendet.
            </>
          }
          color="orange"
        />
        <HelpCard
          icon={<ExclamationTriangleIcon />}
          title="Was ist die Gefahr der Deepfakes?"
          description="Die wachsende Verbreitung von Deepfake-Technologie birgt Risiken. Daher ist es wichtig, Menschen in diesem Bereich zu schulen – genau dafür wurde diese Website erstellt."
          color="red"
        />
        <HelpCard
          icon={<ComputerDesktopIcon />}
          title="Welche Tools erkennen Deepfakes?"
          description="Es gibt Software-Tools zur Erkennung von Deepfakes, die Anomalien in Videos und Bildern analysieren, darunter Deepware Scanner und Sensity AI"
          color="cyan"
        />
      </div>
    </main>
  );
}
