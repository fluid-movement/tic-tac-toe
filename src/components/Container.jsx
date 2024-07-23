export default function Container({children}) {
    return (
        <div className="container mx-auto p-4 md:p-16">
            {children}
        </div>
    )
}