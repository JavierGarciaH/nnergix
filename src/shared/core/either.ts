enum EitherKind {
  Left,
  Right,
}

type Left<L> = { kind: EitherKind.Left; leftValue: L };
type Right<R> = { kind: EitherKind.Right; rightValue: R };


type EitherValue<L, R> = Left<L> | Right<R>;

export class Either<L, R> {
  private constructor(private readonly value: EitherValue<L, R>) { }

  public isLeft(): boolean {
    return this.value.kind === EitherKind.Left;
  }

  public isRight(): boolean {
    return this.value.kind === EitherKind.Right;
  }

  public fold<T1, T2>(leftFn: (left: L) => T1, rightFn: (right: R) => T2): T1 | T2 {
    switch (this.value.kind) {
      case EitherKind.Left:
        return leftFn(this.value.leftValue);
      case EitherKind.Right:
        return rightFn(this.value.rightValue);
    }
  }

  public map<T>(fn: (r: R) => T): Either<L, T> {
    return this.flatMap(r => Either.right(fn(r)));
  }

  public flatMap<T>(fn: (right: R) => Either<L, T>): Either<L, T> {
    return this.fold(leftValue => Either.left(leftValue), rightValue => fn(rightValue));
  }

  public getOrThrow(errorMessage?: string): R {
    const throwFn = () => {
      throw Error(errorMessage ? errorMessage : 'An error has ocurred: ' + this.value);
    };

    return this.fold(() => throwFn(), rightValue => rightValue);
  }

  public getRight(): R {
    const throwFn = () => {
      throw Error('The value is left: ' + JSON.stringify(this.value));
    };

    return this.fold(() => throwFn(), someValue => someValue);
  }

  public getRightOrUndefined(): R | undefined {
    return this.fold(() => undefined, someValue => someValue);
  }

  public getLeft(): L {
    const throwFn = () => {
      throw Error('The value is right: ' + JSON.stringify(this.value));
    };

    return this.fold(someValue => someValue, () => throwFn());
  }

  public getLeftOrUndefined(): L | undefined {
    return this.fold(someValue => someValue, () => undefined);
  }

  public getOrElse(defaultValue: R): R {
    return this.fold(() => defaultValue, someValue => someValue);
  }

  public static left<L, R>(value: L) {
    return new Either<L, R>({ kind: EitherKind.Left, leftValue: value });
  }

  public static right<L, R>(value: R) {
    return new Either<L, R>({ kind: EitherKind.Right, rightValue: value });
  }

  public static ok<L, R>(value: R): Either<L, R> {
    return Either.right(value);
  }

  public static combine(eithers: Either<any, any>[]) {
    for (let either of eithers) {
      if (either.isLeft()) return either;
    }
    return Either.ok('');
  }
}
