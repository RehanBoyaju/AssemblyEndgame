import clsx from "clsx";
export default function Language({lang,isLost}){
    const styles = {backgroundColor:lang.backgroundColor,color:lang.color};
    return (
        <div key={lang.name} className="language" style={styles}>
            <div className={clsx(isLost && "lost")}></div>
            {lang.name}
        </div>
    )
}