type Coords3D = {
x: number
y: number
z: number
}

type Coords2D = Pick<Coords3D, 'x' | 'y'>