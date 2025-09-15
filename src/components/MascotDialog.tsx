import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Sparkles } from "lucide-react"
import Lottie from "lottie-react"
import mascotAnimation from "@/assets/Smiling Owl.json"
// import { Skeleton } from "@/components/ui/skeleton"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

const Dictaphone = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable,
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    if (!isMicrophoneAvailable) {
        return <span>Microphone not available. Please check your microphone settings.</span>;
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <Button onClick={() => SpeechRecognition.startListening({ continuous: true })}>
                Start
            </Button>

            <Button onClick={() => SpeechRecognition.stopListening()}>
                Stop
            </Button>
            <Button onClick={resetTranscript}>Reset</Button>
            <p>{transcript}</p>
        </div>
    );
};


export default function MascotDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="relative -top-11">
                    <Button variant="neutral" className="h-17 w-17">
                        <Sparkles className="!size-6" />
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ask Malli</DialogTitle>
                    <DialogDescription>
                        Ask Malli any doubt or questions you might have!</DialogDescription>
                </DialogHeader>
                <>
                    <Lottie animationData={mascotAnimation} loop={true} className="h-72" />
                    <Dictaphone />
                    {/* <Skeleton className="h-[200px] w-full rounded-[13px]" /> */}
                </>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="neutral">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Ask <Sparkles className="!size-4" /> </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
