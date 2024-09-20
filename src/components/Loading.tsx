export default function Loading({ className }: { className?: string }) {
    return <div className={"flex gap-4 items-center " + className ?? ""}>
        Carregando <div className="w-6 h-6 border-t rounded-full animate-spin my-auto" />
    </div>
}