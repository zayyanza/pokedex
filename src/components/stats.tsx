import { Card } from "./ui/card";

interface StatsProps {
   stats: {
    height: number,
    weight: number,
    hp: number,
    exp: number,
    attack: number,
    defence: number,
    splAttack: number,
    splDefence: number,
    speed: number,
   }
}

const Stats = ({stats}: StatsProps) => {

    const statList = [
        { label: "HP", key: "hp" },
        { label: "Attack", key: "attack" },
        { label: "Defence", key: "defence" },
        { label: "Sp. Attack", key: "splAttack" },
        { label: "Sp. Defence", key: "splDefence" },
        { label: "Speed", key: "speed" },
        { label: "EXP", key: "exp" },
        { label: "Height", key: "height" },
        { label: "Weight", key: "weight" },
    ]
    return (
        <>
            <div className="mt-8 grid grid-cols-4 gap-20">
                {statList.map((s) => (
                    <div key={s.key} className="flex flex-col gap-4 items-center">
                        <h2 className="text-lg font-semibold">{s.label}</h2>
                        {s.key === "weight" ? (
                            <Card className="px-8 py-4 text-2xl flex items-center justify-center">
                                {stats[s.key as keyof typeof stats]} kg
                            </Card>
                            ) : s.key === "height" ? (
                            <Card className="px-8 py-4 text-2xl flex items-center justify-center">
                                {stats[s.key as keyof typeof stats]} ft
                            </Card>
                            ) : (
                            <Card className="px-8 py-4 text-2xl flex items-center justify-center">
                                {stats[s.key as keyof typeof stats]}
                            </Card>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Stats;