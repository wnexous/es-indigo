import teachers from "@/config/teachers";


export default function calculateClassesValue(classAmount: number) {
    const classesAvailableAmount = Object.keys(teachers).length
    const valuePerClass = 10
    const comboPrice = 75

    return classAmount == classesAvailableAmount ? comboPrice : (classAmount * valuePerClass)

}