
export function mockTaskManager() {
    return new Promise((resolve)=>{
        resolve([
            "Learn JavaScript",
            "Practice DOM Manipulation",
            "Build a mini project",
            "Revise CSS Flexbox"
        ])
    })
}