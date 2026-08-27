import * as THREE from "three";

export function clamp01(value: number) {
    return THREE.MathUtils.clamp(
        value,
        0,
        1,
    );
}

export function range(
    value: number,
    start: number,
    end: number,
) {
    return THREE.MathUtils.smootherstep(
        THREE.MathUtils.clamp(
            (value - start) /
            Math.max(
                end - start,
                0.00001,
            ),
            0,
            1,
        ),
        0,
        1,
    );
}

export function damp(
    current: number,
    target: number,
    smoothing: number,
    delta: number,
) {
    return THREE.MathUtils.damp(
        current,
        target,
        smoothing,
        delta,
    );
}

export function dampVector3(
    current: THREE.Vector3,
    target: THREE.Vector3,
    smoothing: number,
    delta: number,
) {
    const alpha =
        1 -
        Math.exp(
            -smoothing * delta,
        );

    current.lerp(
        target,
        alpha,
    );

    return current;
}

export function dampEuler(
    current: THREE.Euler,
    target: THREE.Euler,
    smoothing: number,
    delta: number,
) {
    const alpha =
        1 -
        Math.exp(
            -smoothing * delta,
        );

    current.x = THREE.MathUtils.lerp(
        current.x,
        target.x,
        alpha,
    );

    current.y = THREE.MathUtils.lerp(
        current.y,
        target.y,
        alpha,
    );

    current.z = THREE.MathUtils.lerp(
        current.z,
        target.z,
        alpha,
    );

    return current;
}

export function lookAtSmooth(
    object: THREE.Object3D,
    target: THREE.Vector3,
    strength: number,
    delta: number,
) {
    const current =
        new THREE.Quaternion();

    const desired =
        new THREE.Quaternion();

    const matrix =
        new THREE.Matrix4();

    current.copy(
        object.quaternion,
    );

    matrix.lookAt(
        object.position,
        target,
        object.up,
    );

    desired.setFromRotationMatrix(
        matrix,
    );

    const alpha =
        1 -
        Math.exp(
            -strength * delta,
        );

    object.quaternion.slerp(
        desired,
        alpha,
    );
}