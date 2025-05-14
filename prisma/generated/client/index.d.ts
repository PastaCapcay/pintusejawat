/**
 * Client
 **/

import * as runtime from './runtime/binary.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model PaketSoal
 *
 */
export type PaketSoal = $Result.DefaultSelection<Prisma.$PaketSoalPayload>;
/**
 * Model TryoutHistory
 *
 */
export type TryoutHistory =
  $Result.DefaultSelection<Prisma.$TryoutHistoryPayload>;
/**
 * Model Soal
 *
 */
export type Soal = $Result.DefaultSelection<Prisma.$SoalPayload>;
/**
 * Model Materi
 *
 */
export type Materi = $Result.DefaultSelection<Prisma.$MateriPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
    USER: 'USER';
    ADMIN: 'ADMIN';
  };

  export type Role = (typeof Role)[keyof typeof Role];

  export const Grade: {
    FREE: 'FREE';
    PREMIUM: 'PREMIUM';
    PRO: 'PRO';
  };

  export type Grade = (typeof Grade)[keyof typeof Grade];

  export const JenisMateri: {
    VIDEO: 'VIDEO';
    DOKUMEN: 'DOKUMEN';
  };

  export type JenisMateri = (typeof JenisMateri)[keyof typeof JenisMateri];
}

export type Role = $Enums.Role;

export const Role: typeof $Enums.Role;

export type Grade = $Enums.Grade;

export const Grade: typeof $Enums.Grade;

export type JenisMateri = $Enums.JenisMateri;

export const JenisMateri: typeof $Enums.JenisMateri;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>
  );
  $on<V extends U | 'beforeExit'>(
    eventType: V,
    callback: (
      event: V extends 'query'
        ? Prisma.QueryEvent
        : V extends 'beforeExit'
          ? () => $Utils.JsPromise<void>
          : Prisma.LogEvent
    ) => void
  ): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel }
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.paketSoal`: Exposes CRUD operations for the **PaketSoal** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more PaketSoals
   * const paketSoals = await prisma.paketSoal.findMany()
   * ```
   */
  get paketSoal(): Prisma.PaketSoalDelegate<ExtArgs>;

  /**
   * `prisma.tryoutHistory`: Exposes CRUD operations for the **TryoutHistory** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more TryoutHistories
   * const tryoutHistories = await prisma.tryoutHistory.findMany()
   * ```
   */
  get tryoutHistory(): Prisma.TryoutHistoryDelegate<ExtArgs>;

  /**
   * `prisma.soal`: Exposes CRUD operations for the **Soal** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Soals
   * const soals = await prisma.soal.findMany()
   * ```
   */
  get soal(): Prisma.SoalDelegate<ExtArgs>;

  /**
   * `prisma.materi`: Exposes CRUD operations for the **Materi** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Materis
   * const materis = await prisma.materi.findMany()
   * ```
   */
  get materi(): Prisma.MateriDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;
  export import NotFoundError = runtime.NotFoundError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? K : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: 'User';
    PaketSoal: 'PaketSoal';
    TryoutHistory: 'TryoutHistory';
    Soal: 'Soal';
    Materi: 'Materi';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb
    extends $Utils.Fn<
      { extArgs: $Extensions.InternalArgs; clientOptions: PrismaClientOptions },
      $Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      this['params']['clientOptions']
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    ClientOptions = {}
  > = {
    meta: {
      modelProps: 'user' | 'paketSoal' | 'tryoutHistory' | 'soal' | 'materi';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      PaketSoal: {
        payload: Prisma.$PaketSoalPayload<ExtArgs>;
        fields: Prisma.PaketSoalFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.PaketSoalFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaketSoalPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.PaketSoalFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaketSoalPayload>;
          };
          findFirst: {
            args: Prisma.PaketSoalFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaketSoalPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.PaketSoalFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaketSoalPayload>;
          };
          findMany: {
            args: Prisma.PaketSoalFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaketSoalPayload>[];
          };
          create: {
            args: Prisma.PaketSoalCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaketSoalPayload>;
          };
          createMany: {
            args: Prisma.PaketSoalCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.PaketSoalCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaketSoalPayload>[];
          };
          delete: {
            args: Prisma.PaketSoalDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaketSoalPayload>;
          };
          update: {
            args: Prisma.PaketSoalUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaketSoalPayload>;
          };
          deleteMany: {
            args: Prisma.PaketSoalDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.PaketSoalUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.PaketSoalUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PaketSoalPayload>;
          };
          aggregate: {
            args: Prisma.PaketSoalAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregatePaketSoal>;
          };
          groupBy: {
            args: Prisma.PaketSoalGroupByArgs<ExtArgs>;
            result: $Utils.Optional<PaketSoalGroupByOutputType>[];
          };
          count: {
            args: Prisma.PaketSoalCountArgs<ExtArgs>;
            result: $Utils.Optional<PaketSoalCountAggregateOutputType> | number;
          };
        };
      };
      TryoutHistory: {
        payload: Prisma.$TryoutHistoryPayload<ExtArgs>;
        fields: Prisma.TryoutHistoryFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.TryoutHistoryFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TryoutHistoryPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.TryoutHistoryFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TryoutHistoryPayload>;
          };
          findFirst: {
            args: Prisma.TryoutHistoryFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TryoutHistoryPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.TryoutHistoryFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TryoutHistoryPayload>;
          };
          findMany: {
            args: Prisma.TryoutHistoryFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TryoutHistoryPayload>[];
          };
          create: {
            args: Prisma.TryoutHistoryCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TryoutHistoryPayload>;
          };
          createMany: {
            args: Prisma.TryoutHistoryCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.TryoutHistoryCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TryoutHistoryPayload>[];
          };
          delete: {
            args: Prisma.TryoutHistoryDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TryoutHistoryPayload>;
          };
          update: {
            args: Prisma.TryoutHistoryUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TryoutHistoryPayload>;
          };
          deleteMany: {
            args: Prisma.TryoutHistoryDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.TryoutHistoryUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.TryoutHistoryUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TryoutHistoryPayload>;
          };
          aggregate: {
            args: Prisma.TryoutHistoryAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateTryoutHistory>;
          };
          groupBy: {
            args: Prisma.TryoutHistoryGroupByArgs<ExtArgs>;
            result: $Utils.Optional<TryoutHistoryGroupByOutputType>[];
          };
          count: {
            args: Prisma.TryoutHistoryCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<TryoutHistoryCountAggregateOutputType>
              | number;
          };
        };
      };
      Soal: {
        payload: Prisma.$SoalPayload<ExtArgs>;
        fields: Prisma.SoalFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SoalFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SoalPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SoalFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SoalPayload>;
          };
          findFirst: {
            args: Prisma.SoalFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SoalPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SoalFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SoalPayload>;
          };
          findMany: {
            args: Prisma.SoalFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SoalPayload>[];
          };
          create: {
            args: Prisma.SoalCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SoalPayload>;
          };
          createMany: {
            args: Prisma.SoalCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SoalCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SoalPayload>[];
          };
          delete: {
            args: Prisma.SoalDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SoalPayload>;
          };
          update: {
            args: Prisma.SoalUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SoalPayload>;
          };
          deleteMany: {
            args: Prisma.SoalDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SoalUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.SoalUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SoalPayload>;
          };
          aggregate: {
            args: Prisma.SoalAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSoal>;
          };
          groupBy: {
            args: Prisma.SoalGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SoalGroupByOutputType>[];
          };
          count: {
            args: Prisma.SoalCountArgs<ExtArgs>;
            result: $Utils.Optional<SoalCountAggregateOutputType> | number;
          };
        };
      };
      Materi: {
        payload: Prisma.$MateriPayload<ExtArgs>;
        fields: Prisma.MateriFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.MateriFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MateriPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.MateriFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MateriPayload>;
          };
          findFirst: {
            args: Prisma.MateriFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MateriPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.MateriFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MateriPayload>;
          };
          findMany: {
            args: Prisma.MateriFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MateriPayload>[];
          };
          create: {
            args: Prisma.MateriCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MateriPayload>;
          };
          createMany: {
            args: Prisma.MateriCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.MateriCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MateriPayload>[];
          };
          delete: {
            args: Prisma.MateriDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MateriPayload>;
          };
          update: {
            args: Prisma.MateriUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MateriPayload>;
          };
          deleteMany: {
            args: Prisma.MateriDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.MateriUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.MateriUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MateriPayload>;
          };
          aggregate: {
            args: Prisma.MateriAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateMateri>;
          };
          groupBy: {
            args: Prisma.MateriGroupByArgs<ExtArgs>;
            result: $Utils.Optional<MateriGroupByOutputType>[];
          };
          count: {
            args: Prisma.MateriCountArgs<ExtArgs>;
            result: $Utils.Optional<MateriCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type GetLogType<T extends LogLevel | LogDefinition> =
    T extends LogDefinition
      ? T['emit'] extends 'event'
        ? T['level']
        : never
      : never;
  export type GetEvents<T extends any> =
    T extends Array<LogLevel | LogDefinition>
      ?
          | GetLogType<T[0]>
          | GetLogType<T[1]>
          | GetLogType<T[2]>
          | GetLogType<T[3]>
      : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    tryoutHistory: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    tryoutHistory?: boolean | UserCountOutputTypeCountTryoutHistoryArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTryoutHistoryArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: TryoutHistoryWhereInput;
  };

  /**
   * Count Type PaketSoalCountOutputType
   */

  export type PaketSoalCountOutputType = {
    soal: number;
    tryoutHistory: number;
  };

  export type PaketSoalCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    soal?: boolean | PaketSoalCountOutputTypeCountSoalArgs;
    tryoutHistory?: boolean | PaketSoalCountOutputTypeCountTryoutHistoryArgs;
  };

  // Custom InputTypes
  /**
   * PaketSoalCountOutputType without action
   */
  export type PaketSoalCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PaketSoalCountOutputType
     */
    select?: PaketSoalCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * PaketSoalCountOutputType without action
   */
  export type PaketSoalCountOutputTypeCountSoalArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: SoalWhereInput;
  };

  /**
   * PaketSoalCountOutputType without action
   */
  export type PaketSoalCountOutputTypeCountTryoutHistoryArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: TryoutHistoryWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    clerkId: string | null;
    email: string | null;
    name: string | null;
    role: $Enums.Role | null;
    grade: $Enums.Grade | null;
    createdAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    clerkId: string | null;
    email: string | null;
    name: string | null;
    role: $Enums.Role | null;
    grade: $Enums.Grade | null;
    createdAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    clerkId: number;
    email: number;
    name: number;
    role: number;
    grade: number;
    createdAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    clerkId?: true;
    email?: true;
    name?: true;
    role?: true;
    grade?: true;
    createdAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    clerkId?: true;
    email?: true;
    name?: true;
    role?: true;
    grade?: true;
    createdAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    clerkId?: true;
    email?: true;
    name?: true;
    role?: true;
    grade?: true;
    createdAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: UserWhereInput;
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    clerkId: string;
    email: string;
    name: string | null;
    role: $Enums.Role;
    grade: $Enums.Grade;
    createdAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      clerkId?: boolean;
      email?: boolean;
      name?: boolean;
      role?: boolean;
      grade?: boolean;
      createdAt?: boolean;
      tryoutHistory?: boolean | User$tryoutHistoryArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      clerkId?: boolean;
      email?: boolean;
      name?: boolean;
      role?: boolean;
      grade?: boolean;
      createdAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectScalar = {
    id?: boolean;
    clerkId?: boolean;
    email?: boolean;
    name?: boolean;
    role?: boolean;
    grade?: boolean;
    createdAt?: boolean;
  };

  export type UserInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    tryoutHistory?: boolean | User$tryoutHistoryArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {};

  export type $UserPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'User';
    objects: {
      tryoutHistory: Prisma.$TryoutHistoryPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        clerkId: string;
        email: string;
        name: string | null;
        role: $Enums.Role;
        grade: $Enums.Grade;
        createdAt: Date;
      },
      ExtArgs['result']['user']
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
    $Result.GetResult<Prisma.$UserPayload, S>;

  type UserCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['User'];
      meta: { name: 'User' };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    tryoutHistory<T extends User$tryoutHistoryArgs<ExtArgs> = {}>(
      args?: Subset<T, User$tryoutHistoryArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$TryoutHistoryPayload<ExtArgs>, T, 'findMany'>
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<'User', 'String'>;
    readonly clerkId: FieldRef<'User', 'String'>;
    readonly email: FieldRef<'User', 'String'>;
    readonly name: FieldRef<'User', 'String'>;
    readonly role: FieldRef<'User', 'Role'>;
    readonly grade: FieldRef<'User', 'Grade'>;
    readonly createdAt: FieldRef<'User', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
  };

  /**
   * User.tryoutHistory
   */
  export type User$tryoutHistoryArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the TryoutHistory
     */
    select?: TryoutHistorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TryoutHistoryInclude<ExtArgs> | null;
    where?: TryoutHistoryWhereInput;
    orderBy?:
      | TryoutHistoryOrderByWithRelationInput
      | TryoutHistoryOrderByWithRelationInput[];
    cursor?: TryoutHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: TryoutHistoryScalarFieldEnum | TryoutHistoryScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  };

  /**
   * Model PaketSoal
   */

  export type AggregatePaketSoal = {
    _count: PaketSoalCountAggregateOutputType | null;
    _min: PaketSoalMinAggregateOutputType | null;
    _max: PaketSoalMaxAggregateOutputType | null;
  };

  export type PaketSoalMinAggregateOutputType = {
    id: string | null;
    judul: string | null;
    deskripsi: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PaketSoalMaxAggregateOutputType = {
    id: string | null;
    judul: string | null;
    deskripsi: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PaketSoalCountAggregateOutputType = {
    id: number;
    judul: number;
    deskripsi: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type PaketSoalMinAggregateInputType = {
    id?: true;
    judul?: true;
    deskripsi?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PaketSoalMaxAggregateInputType = {
    id?: true;
    judul?: true;
    deskripsi?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PaketSoalCountAggregateInputType = {
    id?: true;
    judul?: true;
    deskripsi?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type PaketSoalAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which PaketSoal to aggregate.
     */
    where?: PaketSoalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PaketSoals to fetch.
     */
    orderBy?:
      | PaketSoalOrderByWithRelationInput
      | PaketSoalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: PaketSoalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PaketSoals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PaketSoals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PaketSoals
     **/
    _count?: true | PaketSoalCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: PaketSoalMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: PaketSoalMaxAggregateInputType;
  };

  export type GetPaketSoalAggregateType<T extends PaketSoalAggregateArgs> = {
    [P in keyof T & keyof AggregatePaketSoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaketSoal[P]>
      : GetScalarType<T[P], AggregatePaketSoal[P]>;
  };

  export type PaketSoalGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: PaketSoalWhereInput;
    orderBy?:
      | PaketSoalOrderByWithAggregationInput
      | PaketSoalOrderByWithAggregationInput[];
    by: PaketSoalScalarFieldEnum[] | PaketSoalScalarFieldEnum;
    having?: PaketSoalScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PaketSoalCountAggregateInputType | true;
    _min?: PaketSoalMinAggregateInputType;
    _max?: PaketSoalMaxAggregateInputType;
  };

  export type PaketSoalGroupByOutputType = {
    id: string;
    judul: string;
    deskripsi: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: PaketSoalCountAggregateOutputType | null;
    _min: PaketSoalMinAggregateOutputType | null;
    _max: PaketSoalMaxAggregateOutputType | null;
  };

  type GetPaketSoalGroupByPayload<T extends PaketSoalGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<PaketSoalGroupByOutputType, T['by']> & {
          [P in keyof T & keyof PaketSoalGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaketSoalGroupByOutputType[P]>
            : GetScalarType<T[P], PaketSoalGroupByOutputType[P]>;
        }
      >
    >;

  export type PaketSoalSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      judul?: boolean;
      deskripsi?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      soal?: boolean | PaketSoal$soalArgs<ExtArgs>;
      tryoutHistory?: boolean | PaketSoal$tryoutHistoryArgs<ExtArgs>;
      _count?: boolean | PaketSoalCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['paketSoal']
  >;

  export type PaketSoalSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      judul?: boolean;
      deskripsi?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['paketSoal']
  >;

  export type PaketSoalSelectScalar = {
    id?: boolean;
    judul?: boolean;
    deskripsi?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type PaketSoalInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    soal?: boolean | PaketSoal$soalArgs<ExtArgs>;
    tryoutHistory?: boolean | PaketSoal$tryoutHistoryArgs<ExtArgs>;
    _count?: boolean | PaketSoalCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type PaketSoalIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {};

  export type $PaketSoalPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'PaketSoal';
    objects: {
      soal: Prisma.$SoalPayload<ExtArgs>[];
      tryoutHistory: Prisma.$TryoutHistoryPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        judul: string;
        deskripsi: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['paketSoal']
    >;
    composites: {};
  };

  type PaketSoalGetPayload<
    S extends boolean | null | undefined | PaketSoalDefaultArgs
  > = $Result.GetResult<Prisma.$PaketSoalPayload, S>;

  type PaketSoalCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<PaketSoalFindManyArgs, 'select' | 'include' | 'distinct'> & {
    select?: PaketSoalCountAggregateInputType | true;
  };

  export interface PaketSoalDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['PaketSoal'];
      meta: { name: 'PaketSoal' };
    };
    /**
     * Find zero or one PaketSoal that matches the filter.
     * @param {PaketSoalFindUniqueArgs} args - Arguments to find a PaketSoal
     * @example
     * // Get one PaketSoal
     * const paketSoal = await prisma.paketSoal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaketSoalFindUniqueArgs>(
      args: SelectSubset<T, PaketSoalFindUniqueArgs<ExtArgs>>
    ): Prisma__PaketSoalClient<
      $Result.GetResult<
        Prisma.$PaketSoalPayload<ExtArgs>,
        T,
        'findUnique'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one PaketSoal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaketSoalFindUniqueOrThrowArgs} args - Arguments to find a PaketSoal
     * @example
     * // Get one PaketSoal
     * const paketSoal = await prisma.paketSoal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaketSoalFindUniqueOrThrowArgs>(
      args: SelectSubset<T, PaketSoalFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PaketSoalClient<
      $Result.GetResult<
        Prisma.$PaketSoalPayload<ExtArgs>,
        T,
        'findUniqueOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first PaketSoal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaketSoalFindFirstArgs} args - Arguments to find a PaketSoal
     * @example
     * // Get one PaketSoal
     * const paketSoal = await prisma.paketSoal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaketSoalFindFirstArgs>(
      args?: SelectSubset<T, PaketSoalFindFirstArgs<ExtArgs>>
    ): Prisma__PaketSoalClient<
      $Result.GetResult<
        Prisma.$PaketSoalPayload<ExtArgs>,
        T,
        'findFirst'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first PaketSoal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaketSoalFindFirstOrThrowArgs} args - Arguments to find a PaketSoal
     * @example
     * // Get one PaketSoal
     * const paketSoal = await prisma.paketSoal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaketSoalFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PaketSoalFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PaketSoalClient<
      $Result.GetResult<
        Prisma.$PaketSoalPayload<ExtArgs>,
        T,
        'findFirstOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more PaketSoals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaketSoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaketSoals
     * const paketSoals = await prisma.paketSoal.findMany()
     *
     * // Get first 10 PaketSoals
     * const paketSoals = await prisma.paketSoal.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const paketSoalWithIdOnly = await prisma.paketSoal.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PaketSoalFindManyArgs>(
      args?: SelectSubset<T, PaketSoalFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$PaketSoalPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a PaketSoal.
     * @param {PaketSoalCreateArgs} args - Arguments to create a PaketSoal.
     * @example
     * // Create one PaketSoal
     * const PaketSoal = await prisma.paketSoal.create({
     *   data: {
     *     // ... data to create a PaketSoal
     *   }
     * })
     *
     */
    create<T extends PaketSoalCreateArgs>(
      args: SelectSubset<T, PaketSoalCreateArgs<ExtArgs>>
    ): Prisma__PaketSoalClient<
      $Result.GetResult<Prisma.$PaketSoalPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many PaketSoals.
     * @param {PaketSoalCreateManyArgs} args - Arguments to create many PaketSoals.
     * @example
     * // Create many PaketSoals
     * const paketSoal = await prisma.paketSoal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PaketSoalCreateManyArgs>(
      args?: SelectSubset<T, PaketSoalCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many PaketSoals and returns the data saved in the database.
     * @param {PaketSoalCreateManyAndReturnArgs} args - Arguments to create many PaketSoals.
     * @example
     * // Create many PaketSoals
     * const paketSoal = await prisma.paketSoal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PaketSoals and only return the `id`
     * const paketSoalWithIdOnly = await prisma.paketSoal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PaketSoalCreateManyAndReturnArgs>(
      args?: SelectSubset<T, PaketSoalCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$PaketSoalPayload<ExtArgs>,
        T,
        'createManyAndReturn'
      >
    >;

    /**
     * Delete a PaketSoal.
     * @param {PaketSoalDeleteArgs} args - Arguments to delete one PaketSoal.
     * @example
     * // Delete one PaketSoal
     * const PaketSoal = await prisma.paketSoal.delete({
     *   where: {
     *     // ... filter to delete one PaketSoal
     *   }
     * })
     *
     */
    delete<T extends PaketSoalDeleteArgs>(
      args: SelectSubset<T, PaketSoalDeleteArgs<ExtArgs>>
    ): Prisma__PaketSoalClient<
      $Result.GetResult<Prisma.$PaketSoalPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one PaketSoal.
     * @param {PaketSoalUpdateArgs} args - Arguments to update one PaketSoal.
     * @example
     * // Update one PaketSoal
     * const paketSoal = await prisma.paketSoal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PaketSoalUpdateArgs>(
      args: SelectSubset<T, PaketSoalUpdateArgs<ExtArgs>>
    ): Prisma__PaketSoalClient<
      $Result.GetResult<Prisma.$PaketSoalPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more PaketSoals.
     * @param {PaketSoalDeleteManyArgs} args - Arguments to filter PaketSoals to delete.
     * @example
     * // Delete a few PaketSoals
     * const { count } = await prisma.paketSoal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PaketSoalDeleteManyArgs>(
      args?: SelectSubset<T, PaketSoalDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more PaketSoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaketSoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaketSoals
     * const paketSoal = await prisma.paketSoal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PaketSoalUpdateManyArgs>(
      args: SelectSubset<T, PaketSoalUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one PaketSoal.
     * @param {PaketSoalUpsertArgs} args - Arguments to update or create a PaketSoal.
     * @example
     * // Update or create a PaketSoal
     * const paketSoal = await prisma.paketSoal.upsert({
     *   create: {
     *     // ... data to create a PaketSoal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaketSoal we want to update
     *   }
     * })
     */
    upsert<T extends PaketSoalUpsertArgs>(
      args: SelectSubset<T, PaketSoalUpsertArgs<ExtArgs>>
    ): Prisma__PaketSoalClient<
      $Result.GetResult<Prisma.$PaketSoalPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of PaketSoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaketSoalCountArgs} args - Arguments to filter PaketSoals to count.
     * @example
     * // Count the number of PaketSoals
     * const count = await prisma.paketSoal.count({
     *   where: {
     *     // ... the filter for the PaketSoals we want to count
     *   }
     * })
     **/
    count<T extends PaketSoalCountArgs>(
      args?: Subset<T, PaketSoalCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaketSoalCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a PaketSoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaketSoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends PaketSoalAggregateArgs>(
      args: Subset<T, PaketSoalAggregateArgs>
    ): Prisma.PrismaPromise<GetPaketSoalAggregateType<T>>;

    /**
     * Group by PaketSoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaketSoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends PaketSoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaketSoalGroupByArgs['orderBy'] }
        : { orderBy?: PaketSoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, PaketSoalGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetPaketSoalGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PaketSoal model
     */
    readonly fields: PaketSoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaketSoal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaketSoalClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    soal<T extends PaketSoal$soalArgs<ExtArgs> = {}>(
      args?: Subset<T, PaketSoal$soalArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SoalPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    tryoutHistory<T extends PaketSoal$tryoutHistoryArgs<ExtArgs> = {}>(
      args?: Subset<T, PaketSoal$tryoutHistoryArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$TryoutHistoryPayload<ExtArgs>, T, 'findMany'>
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the PaketSoal model
   */
  interface PaketSoalFieldRefs {
    readonly id: FieldRef<'PaketSoal', 'String'>;
    readonly judul: FieldRef<'PaketSoal', 'String'>;
    readonly deskripsi: FieldRef<'PaketSoal', 'String'>;
    readonly createdAt: FieldRef<'PaketSoal', 'DateTime'>;
    readonly updatedAt: FieldRef<'PaketSoal', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * PaketSoal findUnique
   */
  export type PaketSoalFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PaketSoal
     */
    select?: PaketSoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaketSoalInclude<ExtArgs> | null;
    /**
     * Filter, which PaketSoal to fetch.
     */
    where: PaketSoalWhereUniqueInput;
  };

  /**
   * PaketSoal findUniqueOrThrow
   */
  export type PaketSoalFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PaketSoal
     */
    select?: PaketSoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaketSoalInclude<ExtArgs> | null;
    /**
     * Filter, which PaketSoal to fetch.
     */
    where: PaketSoalWhereUniqueInput;
  };

  /**
   * PaketSoal findFirst
   */
  export type PaketSoalFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PaketSoal
     */
    select?: PaketSoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaketSoalInclude<ExtArgs> | null;
    /**
     * Filter, which PaketSoal to fetch.
     */
    where?: PaketSoalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PaketSoals to fetch.
     */
    orderBy?:
      | PaketSoalOrderByWithRelationInput
      | PaketSoalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PaketSoals.
     */
    cursor?: PaketSoalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PaketSoals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PaketSoals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PaketSoals.
     */
    distinct?: PaketSoalScalarFieldEnum | PaketSoalScalarFieldEnum[];
  };

  /**
   * PaketSoal findFirstOrThrow
   */
  export type PaketSoalFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PaketSoal
     */
    select?: PaketSoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaketSoalInclude<ExtArgs> | null;
    /**
     * Filter, which PaketSoal to fetch.
     */
    where?: PaketSoalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PaketSoals to fetch.
     */
    orderBy?:
      | PaketSoalOrderByWithRelationInput
      | PaketSoalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PaketSoals.
     */
    cursor?: PaketSoalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PaketSoals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PaketSoals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PaketSoals.
     */
    distinct?: PaketSoalScalarFieldEnum | PaketSoalScalarFieldEnum[];
  };

  /**
   * PaketSoal findMany
   */
  export type PaketSoalFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PaketSoal
     */
    select?: PaketSoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaketSoalInclude<ExtArgs> | null;
    /**
     * Filter, which PaketSoals to fetch.
     */
    where?: PaketSoalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PaketSoals to fetch.
     */
    orderBy?:
      | PaketSoalOrderByWithRelationInput
      | PaketSoalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PaketSoals.
     */
    cursor?: PaketSoalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PaketSoals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PaketSoals.
     */
    skip?: number;
    distinct?: PaketSoalScalarFieldEnum | PaketSoalScalarFieldEnum[];
  };

  /**
   * PaketSoal create
   */
  export type PaketSoalCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PaketSoal
     */
    select?: PaketSoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaketSoalInclude<ExtArgs> | null;
    /**
     * The data needed to create a PaketSoal.
     */
    data: XOR<PaketSoalCreateInput, PaketSoalUncheckedCreateInput>;
  };

  /**
   * PaketSoal createMany
   */
  export type PaketSoalCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many PaketSoals.
     */
    data: PaketSoalCreateManyInput | PaketSoalCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * PaketSoal createManyAndReturn
   */
  export type PaketSoalCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PaketSoal
     */
    select?: PaketSoalSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many PaketSoals.
     */
    data: PaketSoalCreateManyInput | PaketSoalCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * PaketSoal update
   */
  export type PaketSoalUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PaketSoal
     */
    select?: PaketSoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaketSoalInclude<ExtArgs> | null;
    /**
     * The data needed to update a PaketSoal.
     */
    data: XOR<PaketSoalUpdateInput, PaketSoalUncheckedUpdateInput>;
    /**
     * Choose, which PaketSoal to update.
     */
    where: PaketSoalWhereUniqueInput;
  };

  /**
   * PaketSoal updateMany
   */
  export type PaketSoalUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update PaketSoals.
     */
    data: XOR<
      PaketSoalUpdateManyMutationInput,
      PaketSoalUncheckedUpdateManyInput
    >;
    /**
     * Filter which PaketSoals to update
     */
    where?: PaketSoalWhereInput;
  };

  /**
   * PaketSoal upsert
   */
  export type PaketSoalUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PaketSoal
     */
    select?: PaketSoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaketSoalInclude<ExtArgs> | null;
    /**
     * The filter to search for the PaketSoal to update in case it exists.
     */
    where: PaketSoalWhereUniqueInput;
    /**
     * In case the PaketSoal found by the `where` argument doesn't exist, create a new PaketSoal with this data.
     */
    create: XOR<PaketSoalCreateInput, PaketSoalUncheckedCreateInput>;
    /**
     * In case the PaketSoal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaketSoalUpdateInput, PaketSoalUncheckedUpdateInput>;
  };

  /**
   * PaketSoal delete
   */
  export type PaketSoalDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PaketSoal
     */
    select?: PaketSoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaketSoalInclude<ExtArgs> | null;
    /**
     * Filter which PaketSoal to delete.
     */
    where: PaketSoalWhereUniqueInput;
  };

  /**
   * PaketSoal deleteMany
   */
  export type PaketSoalDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which PaketSoals to delete
     */
    where?: PaketSoalWhereInput;
  };

  /**
   * PaketSoal.soal
   */
  export type PaketSoal$soalArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Soal
     */
    select?: SoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoalInclude<ExtArgs> | null;
    where?: SoalWhereInput;
    orderBy?: SoalOrderByWithRelationInput | SoalOrderByWithRelationInput[];
    cursor?: SoalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SoalScalarFieldEnum | SoalScalarFieldEnum[];
  };

  /**
   * PaketSoal.tryoutHistory
   */
  export type PaketSoal$tryoutHistoryArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the TryoutHistory
     */
    select?: TryoutHistorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TryoutHistoryInclude<ExtArgs> | null;
    where?: TryoutHistoryWhereInput;
    orderBy?:
      | TryoutHistoryOrderByWithRelationInput
      | TryoutHistoryOrderByWithRelationInput[];
    cursor?: TryoutHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: TryoutHistoryScalarFieldEnum | TryoutHistoryScalarFieldEnum[];
  };

  /**
   * PaketSoal without action
   */
  export type PaketSoalDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PaketSoal
     */
    select?: PaketSoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaketSoalInclude<ExtArgs> | null;
  };

  /**
   * Model TryoutHistory
   */

  export type AggregateTryoutHistory = {
    _count: TryoutHistoryCountAggregateOutputType | null;
    _avg: TryoutHistoryAvgAggregateOutputType | null;
    _sum: TryoutHistorySumAggregateOutputType | null;
    _min: TryoutHistoryMinAggregateOutputType | null;
    _max: TryoutHistoryMaxAggregateOutputType | null;
  };

  export type TryoutHistoryAvgAggregateOutputType = {
    score: number | null;
    timeSpent: number | null;
  };

  export type TryoutHistorySumAggregateOutputType = {
    score: number | null;
    timeSpent: number | null;
  };

  export type TryoutHistoryMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    paketSoalId: string | null;
    score: number | null;
    timeSpent: number | null;
    createdAt: Date | null;
  };

  export type TryoutHistoryMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    paketSoalId: string | null;
    score: number | null;
    timeSpent: number | null;
    createdAt: Date | null;
  };

  export type TryoutHistoryCountAggregateOutputType = {
    id: number;
    userId: number;
    paketSoalId: number;
    score: number;
    timeSpent: number;
    answers: number;
    createdAt: number;
    _all: number;
  };

  export type TryoutHistoryAvgAggregateInputType = {
    score?: true;
    timeSpent?: true;
  };

  export type TryoutHistorySumAggregateInputType = {
    score?: true;
    timeSpent?: true;
  };

  export type TryoutHistoryMinAggregateInputType = {
    id?: true;
    userId?: true;
    paketSoalId?: true;
    score?: true;
    timeSpent?: true;
    createdAt?: true;
  };

  export type TryoutHistoryMaxAggregateInputType = {
    id?: true;
    userId?: true;
    paketSoalId?: true;
    score?: true;
    timeSpent?: true;
    createdAt?: true;
  };

  export type TryoutHistoryCountAggregateInputType = {
    id?: true;
    userId?: true;
    paketSoalId?: true;
    score?: true;
    timeSpent?: true;
    answers?: true;
    createdAt?: true;
    _all?: true;
  };

  export type TryoutHistoryAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which TryoutHistory to aggregate.
     */
    where?: TryoutHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TryoutHistories to fetch.
     */
    orderBy?:
      | TryoutHistoryOrderByWithRelationInput
      | TryoutHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: TryoutHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TryoutHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TryoutHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned TryoutHistories
     **/
    _count?: true | TryoutHistoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: TryoutHistoryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: TryoutHistorySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: TryoutHistoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: TryoutHistoryMaxAggregateInputType;
  };

  export type GetTryoutHistoryAggregateType<
    T extends TryoutHistoryAggregateArgs
  > = {
    [P in keyof T & keyof AggregateTryoutHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTryoutHistory[P]>
      : GetScalarType<T[P], AggregateTryoutHistory[P]>;
  };

  export type TryoutHistoryGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: TryoutHistoryWhereInput;
    orderBy?:
      | TryoutHistoryOrderByWithAggregationInput
      | TryoutHistoryOrderByWithAggregationInput[];
    by: TryoutHistoryScalarFieldEnum[] | TryoutHistoryScalarFieldEnum;
    having?: TryoutHistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TryoutHistoryCountAggregateInputType | true;
    _avg?: TryoutHistoryAvgAggregateInputType;
    _sum?: TryoutHistorySumAggregateInputType;
    _min?: TryoutHistoryMinAggregateInputType;
    _max?: TryoutHistoryMaxAggregateInputType;
  };

  export type TryoutHistoryGroupByOutputType = {
    id: string;
    userId: string;
    paketSoalId: string;
    score: number;
    timeSpent: number;
    answers: JsonValue;
    createdAt: Date;
    _count: TryoutHistoryCountAggregateOutputType | null;
    _avg: TryoutHistoryAvgAggregateOutputType | null;
    _sum: TryoutHistorySumAggregateOutputType | null;
    _min: TryoutHistoryMinAggregateOutputType | null;
    _max: TryoutHistoryMaxAggregateOutputType | null;
  };

  type GetTryoutHistoryGroupByPayload<T extends TryoutHistoryGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<TryoutHistoryGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof TryoutHistoryGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TryoutHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], TryoutHistoryGroupByOutputType[P]>;
        }
      >
    >;

  export type TryoutHistorySelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      paketSoalId?: boolean;
      score?: boolean;
      timeSpent?: boolean;
      answers?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      paketSoal?: boolean | PaketSoalDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['tryoutHistory']
  >;

  export type TryoutHistorySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      paketSoalId?: boolean;
      score?: boolean;
      timeSpent?: boolean;
      answers?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      paketSoal?: boolean | PaketSoalDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['tryoutHistory']
  >;

  export type TryoutHistorySelectScalar = {
    id?: boolean;
    userId?: boolean;
    paketSoalId?: boolean;
    score?: boolean;
    timeSpent?: boolean;
    answers?: boolean;
    createdAt?: boolean;
  };

  export type TryoutHistoryInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    paketSoal?: boolean | PaketSoalDefaultArgs<ExtArgs>;
  };
  export type TryoutHistoryIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    paketSoal?: boolean | PaketSoalDefaultArgs<ExtArgs>;
  };

  export type $TryoutHistoryPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'TryoutHistory';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      paketSoal: Prisma.$PaketSoalPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        paketSoalId: string;
        score: number;
        timeSpent: number;
        answers: Prisma.JsonValue;
        createdAt: Date;
      },
      ExtArgs['result']['tryoutHistory']
    >;
    composites: {};
  };

  type TryoutHistoryGetPayload<
    S extends boolean | null | undefined | TryoutHistoryDefaultArgs
  > = $Result.GetResult<Prisma.$TryoutHistoryPayload, S>;

  type TryoutHistoryCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<TryoutHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
    select?: TryoutHistoryCountAggregateInputType | true;
  };

  export interface TryoutHistoryDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['TryoutHistory'];
      meta: { name: 'TryoutHistory' };
    };
    /**
     * Find zero or one TryoutHistory that matches the filter.
     * @param {TryoutHistoryFindUniqueArgs} args - Arguments to find a TryoutHistory
     * @example
     * // Get one TryoutHistory
     * const tryoutHistory = await prisma.tryoutHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TryoutHistoryFindUniqueArgs>(
      args: SelectSubset<T, TryoutHistoryFindUniqueArgs<ExtArgs>>
    ): Prisma__TryoutHistoryClient<
      $Result.GetResult<
        Prisma.$TryoutHistoryPayload<ExtArgs>,
        T,
        'findUnique'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one TryoutHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TryoutHistoryFindUniqueOrThrowArgs} args - Arguments to find a TryoutHistory
     * @example
     * // Get one TryoutHistory
     * const tryoutHistory = await prisma.tryoutHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TryoutHistoryFindUniqueOrThrowArgs>(
      args: SelectSubset<T, TryoutHistoryFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TryoutHistoryClient<
      $Result.GetResult<
        Prisma.$TryoutHistoryPayload<ExtArgs>,
        T,
        'findUniqueOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first TryoutHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TryoutHistoryFindFirstArgs} args - Arguments to find a TryoutHistory
     * @example
     * // Get one TryoutHistory
     * const tryoutHistory = await prisma.tryoutHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TryoutHistoryFindFirstArgs>(
      args?: SelectSubset<T, TryoutHistoryFindFirstArgs<ExtArgs>>
    ): Prisma__TryoutHistoryClient<
      $Result.GetResult<
        Prisma.$TryoutHistoryPayload<ExtArgs>,
        T,
        'findFirst'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first TryoutHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TryoutHistoryFindFirstOrThrowArgs} args - Arguments to find a TryoutHistory
     * @example
     * // Get one TryoutHistory
     * const tryoutHistory = await prisma.tryoutHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TryoutHistoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TryoutHistoryFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TryoutHistoryClient<
      $Result.GetResult<
        Prisma.$TryoutHistoryPayload<ExtArgs>,
        T,
        'findFirstOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more TryoutHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TryoutHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TryoutHistories
     * const tryoutHistories = await prisma.tryoutHistory.findMany()
     *
     * // Get first 10 TryoutHistories
     * const tryoutHistories = await prisma.tryoutHistory.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const tryoutHistoryWithIdOnly = await prisma.tryoutHistory.findMany({ select: { id: true } })
     *
     */
    findMany<T extends TryoutHistoryFindManyArgs>(
      args?: SelectSubset<T, TryoutHistoryFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$TryoutHistoryPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a TryoutHistory.
     * @param {TryoutHistoryCreateArgs} args - Arguments to create a TryoutHistory.
     * @example
     * // Create one TryoutHistory
     * const TryoutHistory = await prisma.tryoutHistory.create({
     *   data: {
     *     // ... data to create a TryoutHistory
     *   }
     * })
     *
     */
    create<T extends TryoutHistoryCreateArgs>(
      args: SelectSubset<T, TryoutHistoryCreateArgs<ExtArgs>>
    ): Prisma__TryoutHistoryClient<
      $Result.GetResult<Prisma.$TryoutHistoryPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many TryoutHistories.
     * @param {TryoutHistoryCreateManyArgs} args - Arguments to create many TryoutHistories.
     * @example
     * // Create many TryoutHistories
     * const tryoutHistory = await prisma.tryoutHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends TryoutHistoryCreateManyArgs>(
      args?: SelectSubset<T, TryoutHistoryCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many TryoutHistories and returns the data saved in the database.
     * @param {TryoutHistoryCreateManyAndReturnArgs} args - Arguments to create many TryoutHistories.
     * @example
     * // Create many TryoutHistories
     * const tryoutHistory = await prisma.tryoutHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many TryoutHistories and only return the `id`
     * const tryoutHistoryWithIdOnly = await prisma.tryoutHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends TryoutHistoryCreateManyAndReturnArgs>(
      args?: SelectSubset<T, TryoutHistoryCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TryoutHistoryPayload<ExtArgs>,
        T,
        'createManyAndReturn'
      >
    >;

    /**
     * Delete a TryoutHistory.
     * @param {TryoutHistoryDeleteArgs} args - Arguments to delete one TryoutHistory.
     * @example
     * // Delete one TryoutHistory
     * const TryoutHistory = await prisma.tryoutHistory.delete({
     *   where: {
     *     // ... filter to delete one TryoutHistory
     *   }
     * })
     *
     */
    delete<T extends TryoutHistoryDeleteArgs>(
      args: SelectSubset<T, TryoutHistoryDeleteArgs<ExtArgs>>
    ): Prisma__TryoutHistoryClient<
      $Result.GetResult<Prisma.$TryoutHistoryPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one TryoutHistory.
     * @param {TryoutHistoryUpdateArgs} args - Arguments to update one TryoutHistory.
     * @example
     * // Update one TryoutHistory
     * const tryoutHistory = await prisma.tryoutHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends TryoutHistoryUpdateArgs>(
      args: SelectSubset<T, TryoutHistoryUpdateArgs<ExtArgs>>
    ): Prisma__TryoutHistoryClient<
      $Result.GetResult<Prisma.$TryoutHistoryPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more TryoutHistories.
     * @param {TryoutHistoryDeleteManyArgs} args - Arguments to filter TryoutHistories to delete.
     * @example
     * // Delete a few TryoutHistories
     * const { count } = await prisma.tryoutHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends TryoutHistoryDeleteManyArgs>(
      args?: SelectSubset<T, TryoutHistoryDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more TryoutHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TryoutHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TryoutHistories
     * const tryoutHistory = await prisma.tryoutHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends TryoutHistoryUpdateManyArgs>(
      args: SelectSubset<T, TryoutHistoryUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one TryoutHistory.
     * @param {TryoutHistoryUpsertArgs} args - Arguments to update or create a TryoutHistory.
     * @example
     * // Update or create a TryoutHistory
     * const tryoutHistory = await prisma.tryoutHistory.upsert({
     *   create: {
     *     // ... data to create a TryoutHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TryoutHistory we want to update
     *   }
     * })
     */
    upsert<T extends TryoutHistoryUpsertArgs>(
      args: SelectSubset<T, TryoutHistoryUpsertArgs<ExtArgs>>
    ): Prisma__TryoutHistoryClient<
      $Result.GetResult<Prisma.$TryoutHistoryPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of TryoutHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TryoutHistoryCountArgs} args - Arguments to filter TryoutHistories to count.
     * @example
     * // Count the number of TryoutHistories
     * const count = await prisma.tryoutHistory.count({
     *   where: {
     *     // ... the filter for the TryoutHistories we want to count
     *   }
     * })
     **/
    count<T extends TryoutHistoryCountArgs>(
      args?: Subset<T, TryoutHistoryCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TryoutHistoryCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a TryoutHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TryoutHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends TryoutHistoryAggregateArgs>(
      args: Subset<T, TryoutHistoryAggregateArgs>
    ): Prisma.PrismaPromise<GetTryoutHistoryAggregateType<T>>;

    /**
     * Group by TryoutHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TryoutHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends TryoutHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TryoutHistoryGroupByArgs['orderBy'] }
        : { orderBy?: TryoutHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, TryoutHistoryGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetTryoutHistoryGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the TryoutHistory model
     */
    readonly fields: TryoutHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TryoutHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TryoutHistoryClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>
      | Null,
      Null,
      ExtArgs
    >;
    paketSoal<T extends PaketSoalDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, PaketSoalDefaultArgs<ExtArgs>>
    ): Prisma__PaketSoalClient<
      | $Result.GetResult<
          Prisma.$PaketSoalPayload<ExtArgs>,
          T,
          'findUniqueOrThrow'
        >
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the TryoutHistory model
   */
  interface TryoutHistoryFieldRefs {
    readonly id: FieldRef<'TryoutHistory', 'String'>;
    readonly userId: FieldRef<'TryoutHistory', 'String'>;
    readonly paketSoalId: FieldRef<'TryoutHistory', 'String'>;
    readonly score: FieldRef<'TryoutHistory', 'Int'>;
    readonly timeSpent: FieldRef<'TryoutHistory', 'Int'>;
    readonly answers: FieldRef<'TryoutHistory', 'Json'>;
    readonly createdAt: FieldRef<'TryoutHistory', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * TryoutHistory findUnique
   */
  export type TryoutHistoryFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the TryoutHistory
     */
    select?: TryoutHistorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TryoutHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which TryoutHistory to fetch.
     */
    where: TryoutHistoryWhereUniqueInput;
  };

  /**
   * TryoutHistory findUniqueOrThrow
   */
  export type TryoutHistoryFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the TryoutHistory
     */
    select?: TryoutHistorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TryoutHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which TryoutHistory to fetch.
     */
    where: TryoutHistoryWhereUniqueInput;
  };

  /**
   * TryoutHistory findFirst
   */
  export type TryoutHistoryFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the TryoutHistory
     */
    select?: TryoutHistorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TryoutHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which TryoutHistory to fetch.
     */
    where?: TryoutHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TryoutHistories to fetch.
     */
    orderBy?:
      | TryoutHistoryOrderByWithRelationInput
      | TryoutHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for TryoutHistories.
     */
    cursor?: TryoutHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TryoutHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TryoutHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of TryoutHistories.
     */
    distinct?: TryoutHistoryScalarFieldEnum | TryoutHistoryScalarFieldEnum[];
  };

  /**
   * TryoutHistory findFirstOrThrow
   */
  export type TryoutHistoryFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the TryoutHistory
     */
    select?: TryoutHistorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TryoutHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which TryoutHistory to fetch.
     */
    where?: TryoutHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TryoutHistories to fetch.
     */
    orderBy?:
      | TryoutHistoryOrderByWithRelationInput
      | TryoutHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for TryoutHistories.
     */
    cursor?: TryoutHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TryoutHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TryoutHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of TryoutHistories.
     */
    distinct?: TryoutHistoryScalarFieldEnum | TryoutHistoryScalarFieldEnum[];
  };

  /**
   * TryoutHistory findMany
   */
  export type TryoutHistoryFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the TryoutHistory
     */
    select?: TryoutHistorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TryoutHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which TryoutHistories to fetch.
     */
    where?: TryoutHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TryoutHistories to fetch.
     */
    orderBy?:
      | TryoutHistoryOrderByWithRelationInput
      | TryoutHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing TryoutHistories.
     */
    cursor?: TryoutHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TryoutHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TryoutHistories.
     */
    skip?: number;
    distinct?: TryoutHistoryScalarFieldEnum | TryoutHistoryScalarFieldEnum[];
  };

  /**
   * TryoutHistory create
   */
  export type TryoutHistoryCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the TryoutHistory
     */
    select?: TryoutHistorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TryoutHistoryInclude<ExtArgs> | null;
    /**
     * The data needed to create a TryoutHistory.
     */
    data: XOR<TryoutHistoryCreateInput, TryoutHistoryUncheckedCreateInput>;
  };

  /**
   * TryoutHistory createMany
   */
  export type TryoutHistoryCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many TryoutHistories.
     */
    data: TryoutHistoryCreateManyInput | TryoutHistoryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * TryoutHistory createManyAndReturn
   */
  export type TryoutHistoryCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the TryoutHistory
     */
    select?: TryoutHistorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many TryoutHistories.
     */
    data: TryoutHistoryCreateManyInput | TryoutHistoryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TryoutHistoryIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * TryoutHistory update
   */
  export type TryoutHistoryUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the TryoutHistory
     */
    select?: TryoutHistorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TryoutHistoryInclude<ExtArgs> | null;
    /**
     * The data needed to update a TryoutHistory.
     */
    data: XOR<TryoutHistoryUpdateInput, TryoutHistoryUncheckedUpdateInput>;
    /**
     * Choose, which TryoutHistory to update.
     */
    where: TryoutHistoryWhereUniqueInput;
  };

  /**
   * TryoutHistory updateMany
   */
  export type TryoutHistoryUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update TryoutHistories.
     */
    data: XOR<
      TryoutHistoryUpdateManyMutationInput,
      TryoutHistoryUncheckedUpdateManyInput
    >;
    /**
     * Filter which TryoutHistories to update
     */
    where?: TryoutHistoryWhereInput;
  };

  /**
   * TryoutHistory upsert
   */
  export type TryoutHistoryUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the TryoutHistory
     */
    select?: TryoutHistorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TryoutHistoryInclude<ExtArgs> | null;
    /**
     * The filter to search for the TryoutHistory to update in case it exists.
     */
    where: TryoutHistoryWhereUniqueInput;
    /**
     * In case the TryoutHistory found by the `where` argument doesn't exist, create a new TryoutHistory with this data.
     */
    create: XOR<TryoutHistoryCreateInput, TryoutHistoryUncheckedCreateInput>;
    /**
     * In case the TryoutHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TryoutHistoryUpdateInput, TryoutHistoryUncheckedUpdateInput>;
  };

  /**
   * TryoutHistory delete
   */
  export type TryoutHistoryDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the TryoutHistory
     */
    select?: TryoutHistorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TryoutHistoryInclude<ExtArgs> | null;
    /**
     * Filter which TryoutHistory to delete.
     */
    where: TryoutHistoryWhereUniqueInput;
  };

  /**
   * TryoutHistory deleteMany
   */
  export type TryoutHistoryDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which TryoutHistories to delete
     */
    where?: TryoutHistoryWhereInput;
  };

  /**
   * TryoutHistory without action
   */
  export type TryoutHistoryDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the TryoutHistory
     */
    select?: TryoutHistorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TryoutHistoryInclude<ExtArgs> | null;
  };

  /**
   * Model Soal
   */

  export type AggregateSoal = {
    _count: SoalCountAggregateOutputType | null;
    _min: SoalMinAggregateOutputType | null;
    _max: SoalMaxAggregateOutputType | null;
  };

  export type SoalMinAggregateOutputType = {
    id: string | null;
    pertanyaan: string | null;
    opsiA: string | null;
    opsiB: string | null;
    opsiC: string | null;
    opsiD: string | null;
    opsiE: string | null;
    jawabanBenar: string | null;
    pembahasan: string | null;
    paketSoalId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SoalMaxAggregateOutputType = {
    id: string | null;
    pertanyaan: string | null;
    opsiA: string | null;
    opsiB: string | null;
    opsiC: string | null;
    opsiD: string | null;
    opsiE: string | null;
    jawabanBenar: string | null;
    pembahasan: string | null;
    paketSoalId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SoalCountAggregateOutputType = {
    id: number;
    pertanyaan: number;
    opsiA: number;
    opsiB: number;
    opsiC: number;
    opsiD: number;
    opsiE: number;
    jawabanBenar: number;
    pembahasan: number;
    paketSoalId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type SoalMinAggregateInputType = {
    id?: true;
    pertanyaan?: true;
    opsiA?: true;
    opsiB?: true;
    opsiC?: true;
    opsiD?: true;
    opsiE?: true;
    jawabanBenar?: true;
    pembahasan?: true;
    paketSoalId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SoalMaxAggregateInputType = {
    id?: true;
    pertanyaan?: true;
    opsiA?: true;
    opsiB?: true;
    opsiC?: true;
    opsiD?: true;
    opsiE?: true;
    jawabanBenar?: true;
    pembahasan?: true;
    paketSoalId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SoalCountAggregateInputType = {
    id?: true;
    pertanyaan?: true;
    opsiA?: true;
    opsiB?: true;
    opsiC?: true;
    opsiD?: true;
    opsiE?: true;
    jawabanBenar?: true;
    pembahasan?: true;
    paketSoalId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type SoalAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Soal to aggregate.
     */
    where?: SoalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Soals to fetch.
     */
    orderBy?: SoalOrderByWithRelationInput | SoalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SoalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Soals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Soals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Soals
     **/
    _count?: true | SoalCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SoalMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SoalMaxAggregateInputType;
  };

  export type GetSoalAggregateType<T extends SoalAggregateArgs> = {
    [P in keyof T & keyof AggregateSoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSoal[P]>
      : GetScalarType<T[P], AggregateSoal[P]>;
  };

  export type SoalGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: SoalWhereInput;
    orderBy?:
      | SoalOrderByWithAggregationInput
      | SoalOrderByWithAggregationInput[];
    by: SoalScalarFieldEnum[] | SoalScalarFieldEnum;
    having?: SoalScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SoalCountAggregateInputType | true;
    _min?: SoalMinAggregateInputType;
    _max?: SoalMaxAggregateInputType;
  };

  export type SoalGroupByOutputType = {
    id: string;
    pertanyaan: string;
    opsiA: string;
    opsiB: string;
    opsiC: string;
    opsiD: string;
    opsiE: string;
    jawabanBenar: string;
    pembahasan: string | null;
    paketSoalId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: SoalCountAggregateOutputType | null;
    _min: SoalMinAggregateOutputType | null;
    _max: SoalMaxAggregateOutputType | null;
  };

  type GetSoalGroupByPayload<T extends SoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SoalGroupByOutputType, T['by']> & {
        [P in keyof T & keyof SoalGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], SoalGroupByOutputType[P]>
          : GetScalarType<T[P], SoalGroupByOutputType[P]>;
      }
    >
  >;

  export type SoalSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      pertanyaan?: boolean;
      opsiA?: boolean;
      opsiB?: boolean;
      opsiC?: boolean;
      opsiD?: boolean;
      opsiE?: boolean;
      jawabanBenar?: boolean;
      pembahasan?: boolean;
      paketSoalId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      paketSoal?: boolean | PaketSoalDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['soal']
  >;

  export type SoalSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      pertanyaan?: boolean;
      opsiA?: boolean;
      opsiB?: boolean;
      opsiC?: boolean;
      opsiD?: boolean;
      opsiE?: boolean;
      jawabanBenar?: boolean;
      pembahasan?: boolean;
      paketSoalId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      paketSoal?: boolean | PaketSoalDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['soal']
  >;

  export type SoalSelectScalar = {
    id?: boolean;
    pertanyaan?: boolean;
    opsiA?: boolean;
    opsiB?: boolean;
    opsiC?: boolean;
    opsiD?: boolean;
    opsiE?: boolean;
    jawabanBenar?: boolean;
    pembahasan?: boolean;
    paketSoalId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type SoalInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    paketSoal?: boolean | PaketSoalDefaultArgs<ExtArgs>;
  };
  export type SoalIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    paketSoal?: boolean | PaketSoalDefaultArgs<ExtArgs>;
  };

  export type $SoalPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'Soal';
    objects: {
      paketSoal: Prisma.$PaketSoalPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        pertanyaan: string;
        opsiA: string;
        opsiB: string;
        opsiC: string;
        opsiD: string;
        opsiE: string;
        jawabanBenar: string;
        pembahasan: string | null;
        paketSoalId: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['soal']
    >;
    composites: {};
  };

  type SoalGetPayload<S extends boolean | null | undefined | SoalDefaultArgs> =
    $Result.GetResult<Prisma.$SoalPayload, S>;

  type SoalCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<SoalFindManyArgs, 'select' | 'include' | 'distinct'> & {
    select?: SoalCountAggregateInputType | true;
  };

  export interface SoalDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Soal'];
      meta: { name: 'Soal' };
    };
    /**
     * Find zero or one Soal that matches the filter.
     * @param {SoalFindUniqueArgs} args - Arguments to find a Soal
     * @example
     * // Get one Soal
     * const soal = await prisma.soal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SoalFindUniqueArgs>(
      args: SelectSubset<T, SoalFindUniqueArgs<ExtArgs>>
    ): Prisma__SoalClient<
      $Result.GetResult<Prisma.$SoalPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Soal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SoalFindUniqueOrThrowArgs} args - Arguments to find a Soal
     * @example
     * // Get one Soal
     * const soal = await prisma.soal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SoalFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SoalFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SoalClient<
      $Result.GetResult<Prisma.$SoalPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Soal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoalFindFirstArgs} args - Arguments to find a Soal
     * @example
     * // Get one Soal
     * const soal = await prisma.soal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SoalFindFirstArgs>(
      args?: SelectSubset<T, SoalFindFirstArgs<ExtArgs>>
    ): Prisma__SoalClient<
      $Result.GetResult<Prisma.$SoalPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Soal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoalFindFirstOrThrowArgs} args - Arguments to find a Soal
     * @example
     * // Get one Soal
     * const soal = await prisma.soal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SoalFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SoalFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SoalClient<
      $Result.GetResult<Prisma.$SoalPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Soals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Soals
     * const soals = await prisma.soal.findMany()
     *
     * // Get first 10 Soals
     * const soals = await prisma.soal.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const soalWithIdOnly = await prisma.soal.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SoalFindManyArgs>(
      args?: SelectSubset<T, SoalFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SoalPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a Soal.
     * @param {SoalCreateArgs} args - Arguments to create a Soal.
     * @example
     * // Create one Soal
     * const Soal = await prisma.soal.create({
     *   data: {
     *     // ... data to create a Soal
     *   }
     * })
     *
     */
    create<T extends SoalCreateArgs>(
      args: SelectSubset<T, SoalCreateArgs<ExtArgs>>
    ): Prisma__SoalClient<
      $Result.GetResult<Prisma.$SoalPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Soals.
     * @param {SoalCreateManyArgs} args - Arguments to create many Soals.
     * @example
     * // Create many Soals
     * const soal = await prisma.soal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SoalCreateManyArgs>(
      args?: SelectSubset<T, SoalCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Soals and returns the data saved in the database.
     * @param {SoalCreateManyAndReturnArgs} args - Arguments to create many Soals.
     * @example
     * // Create many Soals
     * const soal = await prisma.soal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Soals and only return the `id`
     * const soalWithIdOnly = await prisma.soal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SoalCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SoalCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SoalPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Soal.
     * @param {SoalDeleteArgs} args - Arguments to delete one Soal.
     * @example
     * // Delete one Soal
     * const Soal = await prisma.soal.delete({
     *   where: {
     *     // ... filter to delete one Soal
     *   }
     * })
     *
     */
    delete<T extends SoalDeleteArgs>(
      args: SelectSubset<T, SoalDeleteArgs<ExtArgs>>
    ): Prisma__SoalClient<
      $Result.GetResult<Prisma.$SoalPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Soal.
     * @param {SoalUpdateArgs} args - Arguments to update one Soal.
     * @example
     * // Update one Soal
     * const soal = await prisma.soal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SoalUpdateArgs>(
      args: SelectSubset<T, SoalUpdateArgs<ExtArgs>>
    ): Prisma__SoalClient<
      $Result.GetResult<Prisma.$SoalPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Soals.
     * @param {SoalDeleteManyArgs} args - Arguments to filter Soals to delete.
     * @example
     * // Delete a few Soals
     * const { count } = await prisma.soal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SoalDeleteManyArgs>(
      args?: SelectSubset<T, SoalDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Soals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Soals
     * const soal = await prisma.soal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SoalUpdateManyArgs>(
      args: SelectSubset<T, SoalUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Soal.
     * @param {SoalUpsertArgs} args - Arguments to update or create a Soal.
     * @example
     * // Update or create a Soal
     * const soal = await prisma.soal.upsert({
     *   create: {
     *     // ... data to create a Soal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Soal we want to update
     *   }
     * })
     */
    upsert<T extends SoalUpsertArgs>(
      args: SelectSubset<T, SoalUpsertArgs<ExtArgs>>
    ): Prisma__SoalClient<
      $Result.GetResult<Prisma.$SoalPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Soals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoalCountArgs} args - Arguments to filter Soals to count.
     * @example
     * // Count the number of Soals
     * const count = await prisma.soal.count({
     *   where: {
     *     // ... the filter for the Soals we want to count
     *   }
     * })
     **/
    count<T extends SoalCountArgs>(
      args?: Subset<T, SoalCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SoalCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Soal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends SoalAggregateArgs>(
      args: Subset<T, SoalAggregateArgs>
    ): Prisma.PrismaPromise<GetSoalAggregateType<T>>;

    /**
     * Group by Soal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends SoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SoalGroupByArgs['orderBy'] }
        : { orderBy?: SoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, SoalGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetSoalGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Soal model
     */
    readonly fields: SoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Soal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SoalClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    paketSoal<T extends PaketSoalDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, PaketSoalDefaultArgs<ExtArgs>>
    ): Prisma__PaketSoalClient<
      | $Result.GetResult<
          Prisma.$PaketSoalPayload<ExtArgs>,
          T,
          'findUniqueOrThrow'
        >
      | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Soal model
   */
  interface SoalFieldRefs {
    readonly id: FieldRef<'Soal', 'String'>;
    readonly pertanyaan: FieldRef<'Soal', 'String'>;
    readonly opsiA: FieldRef<'Soal', 'String'>;
    readonly opsiB: FieldRef<'Soal', 'String'>;
    readonly opsiC: FieldRef<'Soal', 'String'>;
    readonly opsiD: FieldRef<'Soal', 'String'>;
    readonly opsiE: FieldRef<'Soal', 'String'>;
    readonly jawabanBenar: FieldRef<'Soal', 'String'>;
    readonly pembahasan: FieldRef<'Soal', 'String'>;
    readonly paketSoalId: FieldRef<'Soal', 'String'>;
    readonly createdAt: FieldRef<'Soal', 'DateTime'>;
    readonly updatedAt: FieldRef<'Soal', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Soal findUnique
   */
  export type SoalFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Soal
     */
    select?: SoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoalInclude<ExtArgs> | null;
    /**
     * Filter, which Soal to fetch.
     */
    where: SoalWhereUniqueInput;
  };

  /**
   * Soal findUniqueOrThrow
   */
  export type SoalFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Soal
     */
    select?: SoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoalInclude<ExtArgs> | null;
    /**
     * Filter, which Soal to fetch.
     */
    where: SoalWhereUniqueInput;
  };

  /**
   * Soal findFirst
   */
  export type SoalFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Soal
     */
    select?: SoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoalInclude<ExtArgs> | null;
    /**
     * Filter, which Soal to fetch.
     */
    where?: SoalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Soals to fetch.
     */
    orderBy?: SoalOrderByWithRelationInput | SoalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Soals.
     */
    cursor?: SoalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Soals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Soals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Soals.
     */
    distinct?: SoalScalarFieldEnum | SoalScalarFieldEnum[];
  };

  /**
   * Soal findFirstOrThrow
   */
  export type SoalFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Soal
     */
    select?: SoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoalInclude<ExtArgs> | null;
    /**
     * Filter, which Soal to fetch.
     */
    where?: SoalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Soals to fetch.
     */
    orderBy?: SoalOrderByWithRelationInput | SoalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Soals.
     */
    cursor?: SoalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Soals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Soals.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Soals.
     */
    distinct?: SoalScalarFieldEnum | SoalScalarFieldEnum[];
  };

  /**
   * Soal findMany
   */
  export type SoalFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Soal
     */
    select?: SoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoalInclude<ExtArgs> | null;
    /**
     * Filter, which Soals to fetch.
     */
    where?: SoalWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Soals to fetch.
     */
    orderBy?: SoalOrderByWithRelationInput | SoalOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Soals.
     */
    cursor?: SoalWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Soals from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Soals.
     */
    skip?: number;
    distinct?: SoalScalarFieldEnum | SoalScalarFieldEnum[];
  };

  /**
   * Soal create
   */
  export type SoalCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Soal
     */
    select?: SoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoalInclude<ExtArgs> | null;
    /**
     * The data needed to create a Soal.
     */
    data: XOR<SoalCreateInput, SoalUncheckedCreateInput>;
  };

  /**
   * Soal createMany
   */
  export type SoalCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many Soals.
     */
    data: SoalCreateManyInput | SoalCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Soal createManyAndReturn
   */
  export type SoalCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Soal
     */
    select?: SoalSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Soals.
     */
    data: SoalCreateManyInput | SoalCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoalIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Soal update
   */
  export type SoalUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Soal
     */
    select?: SoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoalInclude<ExtArgs> | null;
    /**
     * The data needed to update a Soal.
     */
    data: XOR<SoalUpdateInput, SoalUncheckedUpdateInput>;
    /**
     * Choose, which Soal to update.
     */
    where: SoalWhereUniqueInput;
  };

  /**
   * Soal updateMany
   */
  export type SoalUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update Soals.
     */
    data: XOR<SoalUpdateManyMutationInput, SoalUncheckedUpdateManyInput>;
    /**
     * Filter which Soals to update
     */
    where?: SoalWhereInput;
  };

  /**
   * Soal upsert
   */
  export type SoalUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Soal
     */
    select?: SoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoalInclude<ExtArgs> | null;
    /**
     * The filter to search for the Soal to update in case it exists.
     */
    where: SoalWhereUniqueInput;
    /**
     * In case the Soal found by the `where` argument doesn't exist, create a new Soal with this data.
     */
    create: XOR<SoalCreateInput, SoalUncheckedCreateInput>;
    /**
     * In case the Soal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SoalUpdateInput, SoalUncheckedUpdateInput>;
  };

  /**
   * Soal delete
   */
  export type SoalDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Soal
     */
    select?: SoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoalInclude<ExtArgs> | null;
    /**
     * Filter which Soal to delete.
     */
    where: SoalWhereUniqueInput;
  };

  /**
   * Soal deleteMany
   */
  export type SoalDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Soals to delete
     */
    where?: SoalWhereInput;
  };

  /**
   * Soal without action
   */
  export type SoalDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Soal
     */
    select?: SoalSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SoalInclude<ExtArgs> | null;
  };

  /**
   * Model Materi
   */

  export type AggregateMateri = {
    _count: MateriCountAggregateOutputType | null;
    _min: MateriMinAggregateOutputType | null;
    _max: MateriMaxAggregateOutputType | null;
  };

  export type MateriMinAggregateOutputType = {
    id: string | null;
    nama: string | null;
    deskripsi: string | null;
    jenis: $Enums.JenisMateri | null;
    link: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type MateriMaxAggregateOutputType = {
    id: string | null;
    nama: string | null;
    deskripsi: string | null;
    jenis: $Enums.JenisMateri | null;
    link: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type MateriCountAggregateOutputType = {
    id: number;
    nama: number;
    deskripsi: number;
    jenis: number;
    link: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type MateriMinAggregateInputType = {
    id?: true;
    nama?: true;
    deskripsi?: true;
    jenis?: true;
    link?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type MateriMaxAggregateInputType = {
    id?: true;
    nama?: true;
    deskripsi?: true;
    jenis?: true;
    link?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type MateriCountAggregateInputType = {
    id?: true;
    nama?: true;
    deskripsi?: true;
    jenis?: true;
    link?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type MateriAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Materi to aggregate.
     */
    where?: MateriWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Materis to fetch.
     */
    orderBy?: MateriOrderByWithRelationInput | MateriOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: MateriWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Materis from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Materis.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Materis
     **/
    _count?: true | MateriCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: MateriMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: MateriMaxAggregateInputType;
  };

  export type GetMateriAggregateType<T extends MateriAggregateArgs> = {
    [P in keyof T & keyof AggregateMateri]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMateri[P]>
      : GetScalarType<T[P], AggregateMateri[P]>;
  };

  export type MateriGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: MateriWhereInput;
    orderBy?:
      | MateriOrderByWithAggregationInput
      | MateriOrderByWithAggregationInput[];
    by: MateriScalarFieldEnum[] | MateriScalarFieldEnum;
    having?: MateriScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MateriCountAggregateInputType | true;
    _min?: MateriMinAggregateInputType;
    _max?: MateriMaxAggregateInputType;
  };

  export type MateriGroupByOutputType = {
    id: string;
    nama: string;
    deskripsi: string | null;
    jenis: $Enums.JenisMateri;
    link: string;
    createdAt: Date;
    updatedAt: Date;
    _count: MateriCountAggregateOutputType | null;
    _min: MateriMinAggregateOutputType | null;
    _max: MateriMaxAggregateOutputType | null;
  };

  type GetMateriGroupByPayload<T extends MateriGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<MateriGroupByOutputType, T['by']> & {
          [P in keyof T & keyof MateriGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MateriGroupByOutputType[P]>
            : GetScalarType<T[P], MateriGroupByOutputType[P]>;
        }
      >
    >;

  export type MateriSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      nama?: boolean;
      deskripsi?: boolean;
      jenis?: boolean;
      link?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['materi']
  >;

  export type MateriSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      nama?: boolean;
      deskripsi?: boolean;
      jenis?: boolean;
      link?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['materi']
  >;

  export type MateriSelectScalar = {
    id?: boolean;
    nama?: boolean;
    deskripsi?: boolean;
    jenis?: boolean;
    link?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type $MateriPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'Materi';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        nama: string;
        deskripsi: string | null;
        jenis: $Enums.JenisMateri;
        link: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['materi']
    >;
    composites: {};
  };

  type MateriGetPayload<
    S extends boolean | null | undefined | MateriDefaultArgs
  > = $Result.GetResult<Prisma.$MateriPayload, S>;

  type MateriCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<MateriFindManyArgs, 'select' | 'include' | 'distinct'> & {
    select?: MateriCountAggregateInputType | true;
  };

  export interface MateriDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Materi'];
      meta: { name: 'Materi' };
    };
    /**
     * Find zero or one Materi that matches the filter.
     * @param {MateriFindUniqueArgs} args - Arguments to find a Materi
     * @example
     * // Get one Materi
     * const materi = await prisma.materi.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MateriFindUniqueArgs>(
      args: SelectSubset<T, MateriFindUniqueArgs<ExtArgs>>
    ): Prisma__MateriClient<
      $Result.GetResult<Prisma.$MateriPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Materi that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MateriFindUniqueOrThrowArgs} args - Arguments to find a Materi
     * @example
     * // Get one Materi
     * const materi = await prisma.materi.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MateriFindUniqueOrThrowArgs>(
      args: SelectSubset<T, MateriFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MateriClient<
      $Result.GetResult<Prisma.$MateriPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Materi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MateriFindFirstArgs} args - Arguments to find a Materi
     * @example
     * // Get one Materi
     * const materi = await prisma.materi.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MateriFindFirstArgs>(
      args?: SelectSubset<T, MateriFindFirstArgs<ExtArgs>>
    ): Prisma__MateriClient<
      $Result.GetResult<Prisma.$MateriPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Materi that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MateriFindFirstOrThrowArgs} args - Arguments to find a Materi
     * @example
     * // Get one Materi
     * const materi = await prisma.materi.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MateriFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MateriFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MateriClient<
      $Result.GetResult<Prisma.$MateriPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Materis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MateriFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Materis
     * const materis = await prisma.materi.findMany()
     *
     * // Get first 10 Materis
     * const materis = await prisma.materi.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const materiWithIdOnly = await prisma.materi.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MateriFindManyArgs>(
      args?: SelectSubset<T, MateriFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$MateriPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a Materi.
     * @param {MateriCreateArgs} args - Arguments to create a Materi.
     * @example
     * // Create one Materi
     * const Materi = await prisma.materi.create({
     *   data: {
     *     // ... data to create a Materi
     *   }
     * })
     *
     */
    create<T extends MateriCreateArgs>(
      args: SelectSubset<T, MateriCreateArgs<ExtArgs>>
    ): Prisma__MateriClient<
      $Result.GetResult<Prisma.$MateriPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Materis.
     * @param {MateriCreateManyArgs} args - Arguments to create many Materis.
     * @example
     * // Create many Materis
     * const materi = await prisma.materi.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MateriCreateManyArgs>(
      args?: SelectSubset<T, MateriCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Materis and returns the data saved in the database.
     * @param {MateriCreateManyAndReturnArgs} args - Arguments to create many Materis.
     * @example
     * // Create many Materis
     * const materi = await prisma.materi.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Materis and only return the `id`
     * const materiWithIdOnly = await prisma.materi.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MateriCreateManyAndReturnArgs>(
      args?: SelectSubset<T, MateriCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MateriPayload<ExtArgs>,
        T,
        'createManyAndReturn'
      >
    >;

    /**
     * Delete a Materi.
     * @param {MateriDeleteArgs} args - Arguments to delete one Materi.
     * @example
     * // Delete one Materi
     * const Materi = await prisma.materi.delete({
     *   where: {
     *     // ... filter to delete one Materi
     *   }
     * })
     *
     */
    delete<T extends MateriDeleteArgs>(
      args: SelectSubset<T, MateriDeleteArgs<ExtArgs>>
    ): Prisma__MateriClient<
      $Result.GetResult<Prisma.$MateriPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Materi.
     * @param {MateriUpdateArgs} args - Arguments to update one Materi.
     * @example
     * // Update one Materi
     * const materi = await prisma.materi.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MateriUpdateArgs>(
      args: SelectSubset<T, MateriUpdateArgs<ExtArgs>>
    ): Prisma__MateriClient<
      $Result.GetResult<Prisma.$MateriPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Materis.
     * @param {MateriDeleteManyArgs} args - Arguments to filter Materis to delete.
     * @example
     * // Delete a few Materis
     * const { count } = await prisma.materi.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MateriDeleteManyArgs>(
      args?: SelectSubset<T, MateriDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Materis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MateriUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Materis
     * const materi = await prisma.materi.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MateriUpdateManyArgs>(
      args: SelectSubset<T, MateriUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Materi.
     * @param {MateriUpsertArgs} args - Arguments to update or create a Materi.
     * @example
     * // Update or create a Materi
     * const materi = await prisma.materi.upsert({
     *   create: {
     *     // ... data to create a Materi
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Materi we want to update
     *   }
     * })
     */
    upsert<T extends MateriUpsertArgs>(
      args: SelectSubset<T, MateriUpsertArgs<ExtArgs>>
    ): Prisma__MateriClient<
      $Result.GetResult<Prisma.$MateriPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Materis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MateriCountArgs} args - Arguments to filter Materis to count.
     * @example
     * // Count the number of Materis
     * const count = await prisma.materi.count({
     *   where: {
     *     // ... the filter for the Materis we want to count
     *   }
     * })
     **/
    count<T extends MateriCountArgs>(
      args?: Subset<T, MateriCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MateriCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Materi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MateriAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends MateriAggregateArgs>(
      args: Subset<T, MateriAggregateArgs>
    ): Prisma.PrismaPromise<GetMateriAggregateType<T>>;

    /**
     * Group by Materi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MateriGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends MateriGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MateriGroupByArgs['orderBy'] }
        : { orderBy?: MateriGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, MateriGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetMateriGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Materi model
     */
    readonly fields: MateriFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Materi.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MateriClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Materi model
   */
  interface MateriFieldRefs {
    readonly id: FieldRef<'Materi', 'String'>;
    readonly nama: FieldRef<'Materi', 'String'>;
    readonly deskripsi: FieldRef<'Materi', 'String'>;
    readonly jenis: FieldRef<'Materi', 'JenisMateri'>;
    readonly link: FieldRef<'Materi', 'String'>;
    readonly createdAt: FieldRef<'Materi', 'DateTime'>;
    readonly updatedAt: FieldRef<'Materi', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Materi findUnique
   */
  export type MateriFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Materi
     */
    select?: MateriSelect<ExtArgs> | null;
    /**
     * Filter, which Materi to fetch.
     */
    where: MateriWhereUniqueInput;
  };

  /**
   * Materi findUniqueOrThrow
   */
  export type MateriFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Materi
     */
    select?: MateriSelect<ExtArgs> | null;
    /**
     * Filter, which Materi to fetch.
     */
    where: MateriWhereUniqueInput;
  };

  /**
   * Materi findFirst
   */
  export type MateriFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Materi
     */
    select?: MateriSelect<ExtArgs> | null;
    /**
     * Filter, which Materi to fetch.
     */
    where?: MateriWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Materis to fetch.
     */
    orderBy?: MateriOrderByWithRelationInput | MateriOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Materis.
     */
    cursor?: MateriWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Materis from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Materis.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Materis.
     */
    distinct?: MateriScalarFieldEnum | MateriScalarFieldEnum[];
  };

  /**
   * Materi findFirstOrThrow
   */
  export type MateriFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Materi
     */
    select?: MateriSelect<ExtArgs> | null;
    /**
     * Filter, which Materi to fetch.
     */
    where?: MateriWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Materis to fetch.
     */
    orderBy?: MateriOrderByWithRelationInput | MateriOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Materis.
     */
    cursor?: MateriWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Materis from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Materis.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Materis.
     */
    distinct?: MateriScalarFieldEnum | MateriScalarFieldEnum[];
  };

  /**
   * Materi findMany
   */
  export type MateriFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Materi
     */
    select?: MateriSelect<ExtArgs> | null;
    /**
     * Filter, which Materis to fetch.
     */
    where?: MateriWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Materis to fetch.
     */
    orderBy?: MateriOrderByWithRelationInput | MateriOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Materis.
     */
    cursor?: MateriWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Materis from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Materis.
     */
    skip?: number;
    distinct?: MateriScalarFieldEnum | MateriScalarFieldEnum[];
  };

  /**
   * Materi create
   */
  export type MateriCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Materi
     */
    select?: MateriSelect<ExtArgs> | null;
    /**
     * The data needed to create a Materi.
     */
    data: XOR<MateriCreateInput, MateriUncheckedCreateInput>;
  };

  /**
   * Materi createMany
   */
  export type MateriCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many Materis.
     */
    data: MateriCreateManyInput | MateriCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Materi createManyAndReturn
   */
  export type MateriCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Materi
     */
    select?: MateriSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Materis.
     */
    data: MateriCreateManyInput | MateriCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Materi update
   */
  export type MateriUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Materi
     */
    select?: MateriSelect<ExtArgs> | null;
    /**
     * The data needed to update a Materi.
     */
    data: XOR<MateriUpdateInput, MateriUncheckedUpdateInput>;
    /**
     * Choose, which Materi to update.
     */
    where: MateriWhereUniqueInput;
  };

  /**
   * Materi updateMany
   */
  export type MateriUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update Materis.
     */
    data: XOR<MateriUpdateManyMutationInput, MateriUncheckedUpdateManyInput>;
    /**
     * Filter which Materis to update
     */
    where?: MateriWhereInput;
  };

  /**
   * Materi upsert
   */
  export type MateriUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Materi
     */
    select?: MateriSelect<ExtArgs> | null;
    /**
     * The filter to search for the Materi to update in case it exists.
     */
    where: MateriWhereUniqueInput;
    /**
     * In case the Materi found by the `where` argument doesn't exist, create a new Materi with this data.
     */
    create: XOR<MateriCreateInput, MateriUncheckedCreateInput>;
    /**
     * In case the Materi was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MateriUpdateInput, MateriUncheckedUpdateInput>;
  };

  /**
   * Materi delete
   */
  export type MateriDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Materi
     */
    select?: MateriSelect<ExtArgs> | null;
    /**
     * Filter which Materi to delete.
     */
    where: MateriWhereUniqueInput;
  };

  /**
   * Materi deleteMany
   */
  export type MateriDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Materis to delete
     */
    where?: MateriWhereInput;
  };

  /**
   * Materi without action
   */
  export type MateriDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Materi
     */
    select?: MateriSelect<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: 'id';
    clerkId: 'clerkId';
    email: 'email';
    name: 'name';
    role: 'role';
    grade: 'grade';
    createdAt: 'createdAt';
  };

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const PaketSoalScalarFieldEnum: {
    id: 'id';
    judul: 'judul';
    deskripsi: 'deskripsi';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type PaketSoalScalarFieldEnum =
    (typeof PaketSoalScalarFieldEnum)[keyof typeof PaketSoalScalarFieldEnum];

  export const TryoutHistoryScalarFieldEnum: {
    id: 'id';
    userId: 'userId';
    paketSoalId: 'paketSoalId';
    score: 'score';
    timeSpent: 'timeSpent';
    answers: 'answers';
    createdAt: 'createdAt';
  };

  export type TryoutHistoryScalarFieldEnum =
    (typeof TryoutHistoryScalarFieldEnum)[keyof typeof TryoutHistoryScalarFieldEnum];

  export const SoalScalarFieldEnum: {
    id: 'id';
    pertanyaan: 'pertanyaan';
    opsiA: 'opsiA';
    opsiB: 'opsiB';
    opsiC: 'opsiC';
    opsiD: 'opsiD';
    opsiE: 'opsiE';
    jawabanBenar: 'jawabanBenar';
    pembahasan: 'pembahasan';
    paketSoalId: 'paketSoalId';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type SoalScalarFieldEnum =
    (typeof SoalScalarFieldEnum)[keyof typeof SoalScalarFieldEnum];

  export const MateriScalarFieldEnum: {
    id: 'id';
    nama: 'nama';
    deskripsi: 'deskripsi';
    jenis: 'jenis';
    link: 'link';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type MateriScalarFieldEnum =
    (typeof MateriScalarFieldEnum)[keyof typeof MateriScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull;
  };

  export type JsonNullValueInput =
    (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter =
    (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String'
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String[]'
  >;

  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Role'
  >;

  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Role[]'
  >;

  /**
   * Reference to a field of type 'Grade'
   */
  export type EnumGradeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Grade'
  >;

  /**
   * Reference to a field of type 'Grade[]'
   */
  export type ListEnumGradeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Grade[]'
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime'
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int'
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int[]'
  >;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Json'
  >;

  /**
   * Reference to a field of type 'JenisMateri'
   */
  export type EnumJenisMateriFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'JenisMateri'
  >;

  /**
   * Reference to a field of type 'JenisMateri[]'
   */
  export type ListEnumJenisMateriFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'JenisMateri[]'>;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float'
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float[]'
  >;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<'User'> | string;
    clerkId?: StringFilter<'User'> | string;
    email?: StringFilter<'User'> | string;
    name?: StringNullableFilter<'User'> | string | null;
    role?: EnumRoleFilter<'User'> | $Enums.Role;
    grade?: EnumGradeFilter<'User'> | $Enums.Grade;
    createdAt?: DateTimeFilter<'User'> | Date | string;
    tryoutHistory?: TryoutHistoryListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    clerkId?: SortOrder;
    email?: SortOrder;
    name?: SortOrderInput | SortOrder;
    role?: SortOrder;
    grade?: SortOrder;
    createdAt?: SortOrder;
    tryoutHistory?: TryoutHistoryOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      clerkId?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      name?: StringNullableFilter<'User'> | string | null;
      role?: EnumRoleFilter<'User'> | $Enums.Role;
      grade?: EnumGradeFilter<'User'> | $Enums.Grade;
      createdAt?: DateTimeFilter<'User'> | Date | string;
      tryoutHistory?: TryoutHistoryListRelationFilter;
    },
    'id' | 'clerkId' | 'email'
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    clerkId?: SortOrder;
    email?: SortOrder;
    name?: SortOrderInput | SortOrder;
    role?: SortOrder;
    grade?: SortOrder;
    createdAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'User'> | string;
    clerkId?: StringWithAggregatesFilter<'User'> | string;
    email?: StringWithAggregatesFilter<'User'> | string;
    name?: StringNullableWithAggregatesFilter<'User'> | string | null;
    role?: EnumRoleWithAggregatesFilter<'User'> | $Enums.Role;
    grade?: EnumGradeWithAggregatesFilter<'User'> | $Enums.Grade;
    createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
  };

  export type PaketSoalWhereInput = {
    AND?: PaketSoalWhereInput | PaketSoalWhereInput[];
    OR?: PaketSoalWhereInput[];
    NOT?: PaketSoalWhereInput | PaketSoalWhereInput[];
    id?: StringFilter<'PaketSoal'> | string;
    judul?: StringFilter<'PaketSoal'> | string;
    deskripsi?: StringNullableFilter<'PaketSoal'> | string | null;
    createdAt?: DateTimeFilter<'PaketSoal'> | Date | string;
    updatedAt?: DateTimeFilter<'PaketSoal'> | Date | string;
    soal?: SoalListRelationFilter;
    tryoutHistory?: TryoutHistoryListRelationFilter;
  };

  export type PaketSoalOrderByWithRelationInput = {
    id?: SortOrder;
    judul?: SortOrder;
    deskripsi?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    soal?: SoalOrderByRelationAggregateInput;
    tryoutHistory?: TryoutHistoryOrderByRelationAggregateInput;
  };

  export type PaketSoalWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: PaketSoalWhereInput | PaketSoalWhereInput[];
      OR?: PaketSoalWhereInput[];
      NOT?: PaketSoalWhereInput | PaketSoalWhereInput[];
      judul?: StringFilter<'PaketSoal'> | string;
      deskripsi?: StringNullableFilter<'PaketSoal'> | string | null;
      createdAt?: DateTimeFilter<'PaketSoal'> | Date | string;
      updatedAt?: DateTimeFilter<'PaketSoal'> | Date | string;
      soal?: SoalListRelationFilter;
      tryoutHistory?: TryoutHistoryListRelationFilter;
    },
    'id'
  >;

  export type PaketSoalOrderByWithAggregationInput = {
    id?: SortOrder;
    judul?: SortOrder;
    deskripsi?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: PaketSoalCountOrderByAggregateInput;
    _max?: PaketSoalMaxOrderByAggregateInput;
    _min?: PaketSoalMinOrderByAggregateInput;
  };

  export type PaketSoalScalarWhereWithAggregatesInput = {
    AND?:
      | PaketSoalScalarWhereWithAggregatesInput
      | PaketSoalScalarWhereWithAggregatesInput[];
    OR?: PaketSoalScalarWhereWithAggregatesInput[];
    NOT?:
      | PaketSoalScalarWhereWithAggregatesInput
      | PaketSoalScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'PaketSoal'> | string;
    judul?: StringWithAggregatesFilter<'PaketSoal'> | string;
    deskripsi?: StringNullableWithAggregatesFilter<'PaketSoal'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'PaketSoal'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'PaketSoal'> | Date | string;
  };

  export type TryoutHistoryWhereInput = {
    AND?: TryoutHistoryWhereInput | TryoutHistoryWhereInput[];
    OR?: TryoutHistoryWhereInput[];
    NOT?: TryoutHistoryWhereInput | TryoutHistoryWhereInput[];
    id?: StringFilter<'TryoutHistory'> | string;
    userId?: StringFilter<'TryoutHistory'> | string;
    paketSoalId?: StringFilter<'TryoutHistory'> | string;
    score?: IntFilter<'TryoutHistory'> | number;
    timeSpent?: IntFilter<'TryoutHistory'> | number;
    answers?: JsonFilter<'TryoutHistory'>;
    createdAt?: DateTimeFilter<'TryoutHistory'> | Date | string;
    user?: XOR<UserRelationFilter, UserWhereInput>;
    paketSoal?: XOR<PaketSoalRelationFilter, PaketSoalWhereInput>;
  };

  export type TryoutHistoryOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    paketSoalId?: SortOrder;
    score?: SortOrder;
    timeSpent?: SortOrder;
    answers?: SortOrder;
    createdAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    paketSoal?: PaketSoalOrderByWithRelationInput;
  };

  export type TryoutHistoryWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: TryoutHistoryWhereInput | TryoutHistoryWhereInput[];
      OR?: TryoutHistoryWhereInput[];
      NOT?: TryoutHistoryWhereInput | TryoutHistoryWhereInput[];
      userId?: StringFilter<'TryoutHistory'> | string;
      paketSoalId?: StringFilter<'TryoutHistory'> | string;
      score?: IntFilter<'TryoutHistory'> | number;
      timeSpent?: IntFilter<'TryoutHistory'> | number;
      answers?: JsonFilter<'TryoutHistory'>;
      createdAt?: DateTimeFilter<'TryoutHistory'> | Date | string;
      user?: XOR<UserRelationFilter, UserWhereInput>;
      paketSoal?: XOR<PaketSoalRelationFilter, PaketSoalWhereInput>;
    },
    'id'
  >;

  export type TryoutHistoryOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    paketSoalId?: SortOrder;
    score?: SortOrder;
    timeSpent?: SortOrder;
    answers?: SortOrder;
    createdAt?: SortOrder;
    _count?: TryoutHistoryCountOrderByAggregateInput;
    _avg?: TryoutHistoryAvgOrderByAggregateInput;
    _max?: TryoutHistoryMaxOrderByAggregateInput;
    _min?: TryoutHistoryMinOrderByAggregateInput;
    _sum?: TryoutHistorySumOrderByAggregateInput;
  };

  export type TryoutHistoryScalarWhereWithAggregatesInput = {
    AND?:
      | TryoutHistoryScalarWhereWithAggregatesInput
      | TryoutHistoryScalarWhereWithAggregatesInput[];
    OR?: TryoutHistoryScalarWhereWithAggregatesInput[];
    NOT?:
      | TryoutHistoryScalarWhereWithAggregatesInput
      | TryoutHistoryScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'TryoutHistory'> | string;
    userId?: StringWithAggregatesFilter<'TryoutHistory'> | string;
    paketSoalId?: StringWithAggregatesFilter<'TryoutHistory'> | string;
    score?: IntWithAggregatesFilter<'TryoutHistory'> | number;
    timeSpent?: IntWithAggregatesFilter<'TryoutHistory'> | number;
    answers?: JsonWithAggregatesFilter<'TryoutHistory'>;
    createdAt?: DateTimeWithAggregatesFilter<'TryoutHistory'> | Date | string;
  };

  export type SoalWhereInput = {
    AND?: SoalWhereInput | SoalWhereInput[];
    OR?: SoalWhereInput[];
    NOT?: SoalWhereInput | SoalWhereInput[];
    id?: StringFilter<'Soal'> | string;
    pertanyaan?: StringFilter<'Soal'> | string;
    opsiA?: StringFilter<'Soal'> | string;
    opsiB?: StringFilter<'Soal'> | string;
    opsiC?: StringFilter<'Soal'> | string;
    opsiD?: StringFilter<'Soal'> | string;
    opsiE?: StringFilter<'Soal'> | string;
    jawabanBenar?: StringFilter<'Soal'> | string;
    pembahasan?: StringNullableFilter<'Soal'> | string | null;
    paketSoalId?: StringFilter<'Soal'> | string;
    createdAt?: DateTimeFilter<'Soal'> | Date | string;
    updatedAt?: DateTimeFilter<'Soal'> | Date | string;
    paketSoal?: XOR<PaketSoalRelationFilter, PaketSoalWhereInput>;
  };

  export type SoalOrderByWithRelationInput = {
    id?: SortOrder;
    pertanyaan?: SortOrder;
    opsiA?: SortOrder;
    opsiB?: SortOrder;
    opsiC?: SortOrder;
    opsiD?: SortOrder;
    opsiE?: SortOrder;
    jawabanBenar?: SortOrder;
    pembahasan?: SortOrderInput | SortOrder;
    paketSoalId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    paketSoal?: PaketSoalOrderByWithRelationInput;
  };

  export type SoalWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: SoalWhereInput | SoalWhereInput[];
      OR?: SoalWhereInput[];
      NOT?: SoalWhereInput | SoalWhereInput[];
      pertanyaan?: StringFilter<'Soal'> | string;
      opsiA?: StringFilter<'Soal'> | string;
      opsiB?: StringFilter<'Soal'> | string;
      opsiC?: StringFilter<'Soal'> | string;
      opsiD?: StringFilter<'Soal'> | string;
      opsiE?: StringFilter<'Soal'> | string;
      jawabanBenar?: StringFilter<'Soal'> | string;
      pembahasan?: StringNullableFilter<'Soal'> | string | null;
      paketSoalId?: StringFilter<'Soal'> | string;
      createdAt?: DateTimeFilter<'Soal'> | Date | string;
      updatedAt?: DateTimeFilter<'Soal'> | Date | string;
      paketSoal?: XOR<PaketSoalRelationFilter, PaketSoalWhereInput>;
    },
    'id'
  >;

  export type SoalOrderByWithAggregationInput = {
    id?: SortOrder;
    pertanyaan?: SortOrder;
    opsiA?: SortOrder;
    opsiB?: SortOrder;
    opsiC?: SortOrder;
    opsiD?: SortOrder;
    opsiE?: SortOrder;
    jawabanBenar?: SortOrder;
    pembahasan?: SortOrderInput | SortOrder;
    paketSoalId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: SoalCountOrderByAggregateInput;
    _max?: SoalMaxOrderByAggregateInput;
    _min?: SoalMinOrderByAggregateInput;
  };

  export type SoalScalarWhereWithAggregatesInput = {
    AND?:
      | SoalScalarWhereWithAggregatesInput
      | SoalScalarWhereWithAggregatesInput[];
    OR?: SoalScalarWhereWithAggregatesInput[];
    NOT?:
      | SoalScalarWhereWithAggregatesInput
      | SoalScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Soal'> | string;
    pertanyaan?: StringWithAggregatesFilter<'Soal'> | string;
    opsiA?: StringWithAggregatesFilter<'Soal'> | string;
    opsiB?: StringWithAggregatesFilter<'Soal'> | string;
    opsiC?: StringWithAggregatesFilter<'Soal'> | string;
    opsiD?: StringWithAggregatesFilter<'Soal'> | string;
    opsiE?: StringWithAggregatesFilter<'Soal'> | string;
    jawabanBenar?: StringWithAggregatesFilter<'Soal'> | string;
    pembahasan?: StringNullableWithAggregatesFilter<'Soal'> | string | null;
    paketSoalId?: StringWithAggregatesFilter<'Soal'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Soal'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Soal'> | Date | string;
  };

  export type MateriWhereInput = {
    AND?: MateriWhereInput | MateriWhereInput[];
    OR?: MateriWhereInput[];
    NOT?: MateriWhereInput | MateriWhereInput[];
    id?: StringFilter<'Materi'> | string;
    nama?: StringFilter<'Materi'> | string;
    deskripsi?: StringNullableFilter<'Materi'> | string | null;
    jenis?: EnumJenisMateriFilter<'Materi'> | $Enums.JenisMateri;
    link?: StringFilter<'Materi'> | string;
    createdAt?: DateTimeFilter<'Materi'> | Date | string;
    updatedAt?: DateTimeFilter<'Materi'> | Date | string;
  };

  export type MateriOrderByWithRelationInput = {
    id?: SortOrder;
    nama?: SortOrder;
    deskripsi?: SortOrderInput | SortOrder;
    jenis?: SortOrder;
    link?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type MateriWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: MateriWhereInput | MateriWhereInput[];
      OR?: MateriWhereInput[];
      NOT?: MateriWhereInput | MateriWhereInput[];
      nama?: StringFilter<'Materi'> | string;
      deskripsi?: StringNullableFilter<'Materi'> | string | null;
      jenis?: EnumJenisMateriFilter<'Materi'> | $Enums.JenisMateri;
      link?: StringFilter<'Materi'> | string;
      createdAt?: DateTimeFilter<'Materi'> | Date | string;
      updatedAt?: DateTimeFilter<'Materi'> | Date | string;
    },
    'id'
  >;

  export type MateriOrderByWithAggregationInput = {
    id?: SortOrder;
    nama?: SortOrder;
    deskripsi?: SortOrderInput | SortOrder;
    jenis?: SortOrder;
    link?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: MateriCountOrderByAggregateInput;
    _max?: MateriMaxOrderByAggregateInput;
    _min?: MateriMinOrderByAggregateInput;
  };

  export type MateriScalarWhereWithAggregatesInput = {
    AND?:
      | MateriScalarWhereWithAggregatesInput
      | MateriScalarWhereWithAggregatesInput[];
    OR?: MateriScalarWhereWithAggregatesInput[];
    NOT?:
      | MateriScalarWhereWithAggregatesInput
      | MateriScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Materi'> | string;
    nama?: StringWithAggregatesFilter<'Materi'> | string;
    deskripsi?: StringNullableWithAggregatesFilter<'Materi'> | string | null;
    jenis?: EnumJenisMateriWithAggregatesFilter<'Materi'> | $Enums.JenisMateri;
    link?: StringWithAggregatesFilter<'Materi'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Materi'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Materi'> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    clerkId: string;
    email: string;
    name?: string | null;
    role?: $Enums.Role;
    grade?: $Enums.Grade;
    createdAt?: Date | string;
    tryoutHistory?: TryoutHistoryCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    clerkId: string;
    email: string;
    name?: string | null;
    role?: $Enums.Role;
    grade?: $Enums.Grade;
    createdAt?: Date | string;
    tryoutHistory?: TryoutHistoryUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clerkId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutHistory?: TryoutHistoryUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clerkId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutHistory?: TryoutHistoryUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    clerkId: string;
    email: string;
    name?: string | null;
    role?: $Enums.Role;
    grade?: $Enums.Grade;
    createdAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clerkId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clerkId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PaketSoalCreateInput = {
    id?: string;
    judul: string;
    deskripsi?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    soal?: SoalCreateNestedManyWithoutPaketSoalInput;
    tryoutHistory?: TryoutHistoryCreateNestedManyWithoutPaketSoalInput;
  };

  export type PaketSoalUncheckedCreateInput = {
    id?: string;
    judul: string;
    deskripsi?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    soal?: SoalUncheckedCreateNestedManyWithoutPaketSoalInput;
    tryoutHistory?: TryoutHistoryUncheckedCreateNestedManyWithoutPaketSoalInput;
  };

  export type PaketSoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    judul?: StringFieldUpdateOperationsInput | string;
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    soal?: SoalUpdateManyWithoutPaketSoalNestedInput;
    tryoutHistory?: TryoutHistoryUpdateManyWithoutPaketSoalNestedInput;
  };

  export type PaketSoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    judul?: StringFieldUpdateOperationsInput | string;
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    soal?: SoalUncheckedUpdateManyWithoutPaketSoalNestedInput;
    tryoutHistory?: TryoutHistoryUncheckedUpdateManyWithoutPaketSoalNestedInput;
  };

  export type PaketSoalCreateManyInput = {
    id?: string;
    judul: string;
    deskripsi?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PaketSoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    judul?: StringFieldUpdateOperationsInput | string;
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PaketSoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    judul?: StringFieldUpdateOperationsInput | string;
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TryoutHistoryCreateInput = {
    id?: string;
    score: number;
    timeSpent: number;
    answers: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutTryoutHistoryInput;
    paketSoal: PaketSoalCreateNestedOneWithoutTryoutHistoryInput;
  };

  export type TryoutHistoryUncheckedCreateInput = {
    id?: string;
    userId: string;
    paketSoalId: string;
    score: number;
    timeSpent: number;
    answers: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type TryoutHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    timeSpent?: IntFieldUpdateOperationsInput | number;
    answers?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutTryoutHistoryNestedInput;
    paketSoal?: PaketSoalUpdateOneRequiredWithoutTryoutHistoryNestedInput;
  };

  export type TryoutHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    paketSoalId?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    timeSpent?: IntFieldUpdateOperationsInput | number;
    answers?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TryoutHistoryCreateManyInput = {
    id?: string;
    userId: string;
    paketSoalId: string;
    score: number;
    timeSpent: number;
    answers: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type TryoutHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    timeSpent?: IntFieldUpdateOperationsInput | number;
    answers?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TryoutHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    paketSoalId?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    timeSpent?: IntFieldUpdateOperationsInput | number;
    answers?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SoalCreateInput = {
    id?: string;
    pertanyaan: string;
    opsiA: string;
    opsiB: string;
    opsiC: string;
    opsiD: string;
    opsiE: string;
    jawabanBenar: string;
    pembahasan?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    paketSoal: PaketSoalCreateNestedOneWithoutSoalInput;
  };

  export type SoalUncheckedCreateInput = {
    id?: string;
    pertanyaan: string;
    opsiA: string;
    opsiB: string;
    opsiC: string;
    opsiD: string;
    opsiE: string;
    jawabanBenar: string;
    pembahasan?: string | null;
    paketSoalId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    pertanyaan?: StringFieldUpdateOperationsInput | string;
    opsiA?: StringFieldUpdateOperationsInput | string;
    opsiB?: StringFieldUpdateOperationsInput | string;
    opsiC?: StringFieldUpdateOperationsInput | string;
    opsiD?: StringFieldUpdateOperationsInput | string;
    opsiE?: StringFieldUpdateOperationsInput | string;
    jawabanBenar?: StringFieldUpdateOperationsInput | string;
    pembahasan?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    paketSoal?: PaketSoalUpdateOneRequiredWithoutSoalNestedInput;
  };

  export type SoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    pertanyaan?: StringFieldUpdateOperationsInput | string;
    opsiA?: StringFieldUpdateOperationsInput | string;
    opsiB?: StringFieldUpdateOperationsInput | string;
    opsiC?: StringFieldUpdateOperationsInput | string;
    opsiD?: StringFieldUpdateOperationsInput | string;
    opsiE?: StringFieldUpdateOperationsInput | string;
    jawabanBenar?: StringFieldUpdateOperationsInput | string;
    pembahasan?: NullableStringFieldUpdateOperationsInput | string | null;
    paketSoalId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SoalCreateManyInput = {
    id?: string;
    pertanyaan: string;
    opsiA: string;
    opsiB: string;
    opsiC: string;
    opsiD: string;
    opsiE: string;
    jawabanBenar: string;
    pembahasan?: string | null;
    paketSoalId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    pertanyaan?: StringFieldUpdateOperationsInput | string;
    opsiA?: StringFieldUpdateOperationsInput | string;
    opsiB?: StringFieldUpdateOperationsInput | string;
    opsiC?: StringFieldUpdateOperationsInput | string;
    opsiD?: StringFieldUpdateOperationsInput | string;
    opsiE?: StringFieldUpdateOperationsInput | string;
    jawabanBenar?: StringFieldUpdateOperationsInput | string;
    pembahasan?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    pertanyaan?: StringFieldUpdateOperationsInput | string;
    opsiA?: StringFieldUpdateOperationsInput | string;
    opsiB?: StringFieldUpdateOperationsInput | string;
    opsiC?: StringFieldUpdateOperationsInput | string;
    opsiD?: StringFieldUpdateOperationsInput | string;
    opsiE?: StringFieldUpdateOperationsInput | string;
    jawabanBenar?: StringFieldUpdateOperationsInput | string;
    pembahasan?: NullableStringFieldUpdateOperationsInput | string | null;
    paketSoalId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MateriCreateInput = {
    id?: string;
    nama: string;
    deskripsi?: string | null;
    jenis: $Enums.JenisMateri;
    link: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MateriUncheckedCreateInput = {
    id?: string;
    nama: string;
    deskripsi?: string | null;
    jenis: $Enums.JenisMateri;
    link: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MateriUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    nama?: StringFieldUpdateOperationsInput | string;
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null;
    jenis?: EnumJenisMateriFieldUpdateOperationsInput | $Enums.JenisMateri;
    link?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MateriUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    nama?: StringFieldUpdateOperationsInput | string;
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null;
    jenis?: EnumJenisMateriFieldUpdateOperationsInput | $Enums.JenisMateri;
    link?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MateriCreateManyInput = {
    id?: string;
    nama: string;
    deskripsi?: string | null;
    jenis: $Enums.JenisMateri;
    link: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MateriUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    nama?: StringFieldUpdateOperationsInput | string;
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null;
    jenis?: EnumJenisMateriFieldUpdateOperationsInput | $Enums.JenisMateri;
    link?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MateriUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    nama?: StringFieldUpdateOperationsInput | string;
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null;
    jenis?: EnumJenisMateriFieldUpdateOperationsInput | $Enums.JenisMateri;
    link?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role;
  };

  export type EnumGradeFilter<$PrismaModel = never> = {
    equals?: $Enums.Grade | EnumGradeFieldRefInput<$PrismaModel>;
    in?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>;
    not?: NestedEnumGradeFilter<$PrismaModel> | $Enums.Grade;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type TryoutHistoryListRelationFilter = {
    every?: TryoutHistoryWhereInput;
    some?: TryoutHistoryWhereInput;
    none?: TryoutHistoryWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type TryoutHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    clerkId?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    role?: SortOrder;
    grade?: SortOrder;
    createdAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    clerkId?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    role?: SortOrder;
    grade?: SortOrder;
    createdAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    clerkId?: SortOrder;
    email?: SortOrder;
    name?: SortOrder;
    role?: SortOrder;
    grade?: SortOrder;
    createdAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRoleFilter<$PrismaModel>;
    _max?: NestedEnumRoleFilter<$PrismaModel>;
  };

  export type EnumGradeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Grade | EnumGradeFieldRefInput<$PrismaModel>;
    in?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>;
    not?: NestedEnumGradeWithAggregatesFilter<$PrismaModel> | $Enums.Grade;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumGradeFilter<$PrismaModel>;
    _max?: NestedEnumGradeFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type SoalListRelationFilter = {
    every?: SoalWhereInput;
    some?: SoalWhereInput;
    none?: SoalWhereInput;
  };

  export type SoalOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type PaketSoalCountOrderByAggregateInput = {
    id?: SortOrder;
    judul?: SortOrder;
    deskripsi?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PaketSoalMaxOrderByAggregateInput = {
    id?: SortOrder;
    judul?: SortOrder;
    deskripsi?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PaketSoalMinOrderByAggregateInput = {
    id?: SortOrder;
    judul?: SortOrder;
    deskripsi?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type UserRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type PaketSoalRelationFilter = {
    is?: PaketSoalWhereInput;
    isNot?: PaketSoalWhereInput;
  };

  export type TryoutHistoryCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    paketSoalId?: SortOrder;
    score?: SortOrder;
    timeSpent?: SortOrder;
    answers?: SortOrder;
    createdAt?: SortOrder;
  };

  export type TryoutHistoryAvgOrderByAggregateInput = {
    score?: SortOrder;
    timeSpent?: SortOrder;
  };

  export type TryoutHistoryMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    paketSoalId?: SortOrder;
    score?: SortOrder;
    timeSpent?: SortOrder;
    createdAt?: SortOrder;
  };

  export type TryoutHistoryMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    paketSoalId?: SortOrder;
    score?: SortOrder;
    timeSpent?: SortOrder;
    createdAt?: SortOrder;
  };

  export type TryoutHistorySumOrderByAggregateInput = {
    score?: SortOrder;
    timeSpent?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
            'path'
          >
        >,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>
      >;

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedJsonFilter<$PrismaModel>;
    _max?: NestedJsonFilter<$PrismaModel>;
  };

  export type SoalCountOrderByAggregateInput = {
    id?: SortOrder;
    pertanyaan?: SortOrder;
    opsiA?: SortOrder;
    opsiB?: SortOrder;
    opsiC?: SortOrder;
    opsiD?: SortOrder;
    opsiE?: SortOrder;
    jawabanBenar?: SortOrder;
    pembahasan?: SortOrder;
    paketSoalId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SoalMaxOrderByAggregateInput = {
    id?: SortOrder;
    pertanyaan?: SortOrder;
    opsiA?: SortOrder;
    opsiB?: SortOrder;
    opsiC?: SortOrder;
    opsiD?: SortOrder;
    opsiE?: SortOrder;
    jawabanBenar?: SortOrder;
    pembahasan?: SortOrder;
    paketSoalId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SoalMinOrderByAggregateInput = {
    id?: SortOrder;
    pertanyaan?: SortOrder;
    opsiA?: SortOrder;
    opsiB?: SortOrder;
    opsiC?: SortOrder;
    opsiD?: SortOrder;
    opsiE?: SortOrder;
    jawabanBenar?: SortOrder;
    pembahasan?: SortOrder;
    paketSoalId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumJenisMateriFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisMateri | EnumJenisMateriFieldRefInput<$PrismaModel>;
    in?: $Enums.JenisMateri[] | ListEnumJenisMateriFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.JenisMateri[]
      | ListEnumJenisMateriFieldRefInput<$PrismaModel>;
    not?: NestedEnumJenisMateriFilter<$PrismaModel> | $Enums.JenisMateri;
  };

  export type MateriCountOrderByAggregateInput = {
    id?: SortOrder;
    nama?: SortOrder;
    deskripsi?: SortOrder;
    jenis?: SortOrder;
    link?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type MateriMaxOrderByAggregateInput = {
    id?: SortOrder;
    nama?: SortOrder;
    deskripsi?: SortOrder;
    jenis?: SortOrder;
    link?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type MateriMinOrderByAggregateInput = {
    id?: SortOrder;
    nama?: SortOrder;
    deskripsi?: SortOrder;
    jenis?: SortOrder;
    link?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumJenisMateriWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisMateri | EnumJenisMateriFieldRefInput<$PrismaModel>;
    in?: $Enums.JenisMateri[] | ListEnumJenisMateriFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.JenisMateri[]
      | ListEnumJenisMateriFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumJenisMateriWithAggregatesFilter<$PrismaModel>
      | $Enums.JenisMateri;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumJenisMateriFilter<$PrismaModel>;
    _max?: NestedEnumJenisMateriFilter<$PrismaModel>;
  };

  export type TryoutHistoryCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          TryoutHistoryCreateWithoutUserInput,
          TryoutHistoryUncheckedCreateWithoutUserInput
        >
      | TryoutHistoryCreateWithoutUserInput[]
      | TryoutHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | TryoutHistoryCreateOrConnectWithoutUserInput
      | TryoutHistoryCreateOrConnectWithoutUserInput[];
    createMany?: TryoutHistoryCreateManyUserInputEnvelope;
    connect?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
  };

  export type TryoutHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          TryoutHistoryCreateWithoutUserInput,
          TryoutHistoryUncheckedCreateWithoutUserInput
        >
      | TryoutHistoryCreateWithoutUserInput[]
      | TryoutHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | TryoutHistoryCreateOrConnectWithoutUserInput
      | TryoutHistoryCreateOrConnectWithoutUserInput[];
    createMany?: TryoutHistoryCreateManyUserInputEnvelope;
    connect?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role;
  };

  export type EnumGradeFieldUpdateOperationsInput = {
    set?: $Enums.Grade;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type TryoutHistoryUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          TryoutHistoryCreateWithoutUserInput,
          TryoutHistoryUncheckedCreateWithoutUserInput
        >
      | TryoutHistoryCreateWithoutUserInput[]
      | TryoutHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | TryoutHistoryCreateOrConnectWithoutUserInput
      | TryoutHistoryCreateOrConnectWithoutUserInput[];
    upsert?:
      | TryoutHistoryUpsertWithWhereUniqueWithoutUserInput
      | TryoutHistoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: TryoutHistoryCreateManyUserInputEnvelope;
    set?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
    disconnect?:
      | TryoutHistoryWhereUniqueInput
      | TryoutHistoryWhereUniqueInput[];
    delete?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
    connect?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
    update?:
      | TryoutHistoryUpdateWithWhereUniqueWithoutUserInput
      | TryoutHistoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | TryoutHistoryUpdateManyWithWhereWithoutUserInput
      | TryoutHistoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?:
      | TryoutHistoryScalarWhereInput
      | TryoutHistoryScalarWhereInput[];
  };

  export type TryoutHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          TryoutHistoryCreateWithoutUserInput,
          TryoutHistoryUncheckedCreateWithoutUserInput
        >
      | TryoutHistoryCreateWithoutUserInput[]
      | TryoutHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | TryoutHistoryCreateOrConnectWithoutUserInput
      | TryoutHistoryCreateOrConnectWithoutUserInput[];
    upsert?:
      | TryoutHistoryUpsertWithWhereUniqueWithoutUserInput
      | TryoutHistoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: TryoutHistoryCreateManyUserInputEnvelope;
    set?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
    disconnect?:
      | TryoutHistoryWhereUniqueInput
      | TryoutHistoryWhereUniqueInput[];
    delete?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
    connect?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
    update?:
      | TryoutHistoryUpdateWithWhereUniqueWithoutUserInput
      | TryoutHistoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | TryoutHistoryUpdateManyWithWhereWithoutUserInput
      | TryoutHistoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?:
      | TryoutHistoryScalarWhereInput
      | TryoutHistoryScalarWhereInput[];
  };

  export type SoalCreateNestedManyWithoutPaketSoalInput = {
    create?:
      | XOR<
          SoalCreateWithoutPaketSoalInput,
          SoalUncheckedCreateWithoutPaketSoalInput
        >
      | SoalCreateWithoutPaketSoalInput[]
      | SoalUncheckedCreateWithoutPaketSoalInput[];
    connectOrCreate?:
      | SoalCreateOrConnectWithoutPaketSoalInput
      | SoalCreateOrConnectWithoutPaketSoalInput[];
    createMany?: SoalCreateManyPaketSoalInputEnvelope;
    connect?: SoalWhereUniqueInput | SoalWhereUniqueInput[];
  };

  export type TryoutHistoryCreateNestedManyWithoutPaketSoalInput = {
    create?:
      | XOR<
          TryoutHistoryCreateWithoutPaketSoalInput,
          TryoutHistoryUncheckedCreateWithoutPaketSoalInput
        >
      | TryoutHistoryCreateWithoutPaketSoalInput[]
      | TryoutHistoryUncheckedCreateWithoutPaketSoalInput[];
    connectOrCreate?:
      | TryoutHistoryCreateOrConnectWithoutPaketSoalInput
      | TryoutHistoryCreateOrConnectWithoutPaketSoalInput[];
    createMany?: TryoutHistoryCreateManyPaketSoalInputEnvelope;
    connect?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
  };

  export type SoalUncheckedCreateNestedManyWithoutPaketSoalInput = {
    create?:
      | XOR<
          SoalCreateWithoutPaketSoalInput,
          SoalUncheckedCreateWithoutPaketSoalInput
        >
      | SoalCreateWithoutPaketSoalInput[]
      | SoalUncheckedCreateWithoutPaketSoalInput[];
    connectOrCreate?:
      | SoalCreateOrConnectWithoutPaketSoalInput
      | SoalCreateOrConnectWithoutPaketSoalInput[];
    createMany?: SoalCreateManyPaketSoalInputEnvelope;
    connect?: SoalWhereUniqueInput | SoalWhereUniqueInput[];
  };

  export type TryoutHistoryUncheckedCreateNestedManyWithoutPaketSoalInput = {
    create?:
      | XOR<
          TryoutHistoryCreateWithoutPaketSoalInput,
          TryoutHistoryUncheckedCreateWithoutPaketSoalInput
        >
      | TryoutHistoryCreateWithoutPaketSoalInput[]
      | TryoutHistoryUncheckedCreateWithoutPaketSoalInput[];
    connectOrCreate?:
      | TryoutHistoryCreateOrConnectWithoutPaketSoalInput
      | TryoutHistoryCreateOrConnectWithoutPaketSoalInput[];
    createMany?: TryoutHistoryCreateManyPaketSoalInputEnvelope;
    connect?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
  };

  export type SoalUpdateManyWithoutPaketSoalNestedInput = {
    create?:
      | XOR<
          SoalCreateWithoutPaketSoalInput,
          SoalUncheckedCreateWithoutPaketSoalInput
        >
      | SoalCreateWithoutPaketSoalInput[]
      | SoalUncheckedCreateWithoutPaketSoalInput[];
    connectOrCreate?:
      | SoalCreateOrConnectWithoutPaketSoalInput
      | SoalCreateOrConnectWithoutPaketSoalInput[];
    upsert?:
      | SoalUpsertWithWhereUniqueWithoutPaketSoalInput
      | SoalUpsertWithWhereUniqueWithoutPaketSoalInput[];
    createMany?: SoalCreateManyPaketSoalInputEnvelope;
    set?: SoalWhereUniqueInput | SoalWhereUniqueInput[];
    disconnect?: SoalWhereUniqueInput | SoalWhereUniqueInput[];
    delete?: SoalWhereUniqueInput | SoalWhereUniqueInput[];
    connect?: SoalWhereUniqueInput | SoalWhereUniqueInput[];
    update?:
      | SoalUpdateWithWhereUniqueWithoutPaketSoalInput
      | SoalUpdateWithWhereUniqueWithoutPaketSoalInput[];
    updateMany?:
      | SoalUpdateManyWithWhereWithoutPaketSoalInput
      | SoalUpdateManyWithWhereWithoutPaketSoalInput[];
    deleteMany?: SoalScalarWhereInput | SoalScalarWhereInput[];
  };

  export type TryoutHistoryUpdateManyWithoutPaketSoalNestedInput = {
    create?:
      | XOR<
          TryoutHistoryCreateWithoutPaketSoalInput,
          TryoutHistoryUncheckedCreateWithoutPaketSoalInput
        >
      | TryoutHistoryCreateWithoutPaketSoalInput[]
      | TryoutHistoryUncheckedCreateWithoutPaketSoalInput[];
    connectOrCreate?:
      | TryoutHistoryCreateOrConnectWithoutPaketSoalInput
      | TryoutHistoryCreateOrConnectWithoutPaketSoalInput[];
    upsert?:
      | TryoutHistoryUpsertWithWhereUniqueWithoutPaketSoalInput
      | TryoutHistoryUpsertWithWhereUniqueWithoutPaketSoalInput[];
    createMany?: TryoutHistoryCreateManyPaketSoalInputEnvelope;
    set?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
    disconnect?:
      | TryoutHistoryWhereUniqueInput
      | TryoutHistoryWhereUniqueInput[];
    delete?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
    connect?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
    update?:
      | TryoutHistoryUpdateWithWhereUniqueWithoutPaketSoalInput
      | TryoutHistoryUpdateWithWhereUniqueWithoutPaketSoalInput[];
    updateMany?:
      | TryoutHistoryUpdateManyWithWhereWithoutPaketSoalInput
      | TryoutHistoryUpdateManyWithWhereWithoutPaketSoalInput[];
    deleteMany?:
      | TryoutHistoryScalarWhereInput
      | TryoutHistoryScalarWhereInput[];
  };

  export type SoalUncheckedUpdateManyWithoutPaketSoalNestedInput = {
    create?:
      | XOR<
          SoalCreateWithoutPaketSoalInput,
          SoalUncheckedCreateWithoutPaketSoalInput
        >
      | SoalCreateWithoutPaketSoalInput[]
      | SoalUncheckedCreateWithoutPaketSoalInput[];
    connectOrCreate?:
      | SoalCreateOrConnectWithoutPaketSoalInput
      | SoalCreateOrConnectWithoutPaketSoalInput[];
    upsert?:
      | SoalUpsertWithWhereUniqueWithoutPaketSoalInput
      | SoalUpsertWithWhereUniqueWithoutPaketSoalInput[];
    createMany?: SoalCreateManyPaketSoalInputEnvelope;
    set?: SoalWhereUniqueInput | SoalWhereUniqueInput[];
    disconnect?: SoalWhereUniqueInput | SoalWhereUniqueInput[];
    delete?: SoalWhereUniqueInput | SoalWhereUniqueInput[];
    connect?: SoalWhereUniqueInput | SoalWhereUniqueInput[];
    update?:
      | SoalUpdateWithWhereUniqueWithoutPaketSoalInput
      | SoalUpdateWithWhereUniqueWithoutPaketSoalInput[];
    updateMany?:
      | SoalUpdateManyWithWhereWithoutPaketSoalInput
      | SoalUpdateManyWithWhereWithoutPaketSoalInput[];
    deleteMany?: SoalScalarWhereInput | SoalScalarWhereInput[];
  };

  export type TryoutHistoryUncheckedUpdateManyWithoutPaketSoalNestedInput = {
    create?:
      | XOR<
          TryoutHistoryCreateWithoutPaketSoalInput,
          TryoutHistoryUncheckedCreateWithoutPaketSoalInput
        >
      | TryoutHistoryCreateWithoutPaketSoalInput[]
      | TryoutHistoryUncheckedCreateWithoutPaketSoalInput[];
    connectOrCreate?:
      | TryoutHistoryCreateOrConnectWithoutPaketSoalInput
      | TryoutHistoryCreateOrConnectWithoutPaketSoalInput[];
    upsert?:
      | TryoutHistoryUpsertWithWhereUniqueWithoutPaketSoalInput
      | TryoutHistoryUpsertWithWhereUniqueWithoutPaketSoalInput[];
    createMany?: TryoutHistoryCreateManyPaketSoalInputEnvelope;
    set?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
    disconnect?:
      | TryoutHistoryWhereUniqueInput
      | TryoutHistoryWhereUniqueInput[];
    delete?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
    connect?: TryoutHistoryWhereUniqueInput | TryoutHistoryWhereUniqueInput[];
    update?:
      | TryoutHistoryUpdateWithWhereUniqueWithoutPaketSoalInput
      | TryoutHistoryUpdateWithWhereUniqueWithoutPaketSoalInput[];
    updateMany?:
      | TryoutHistoryUpdateManyWithWhereWithoutPaketSoalInput
      | TryoutHistoryUpdateManyWithWhereWithoutPaketSoalInput[];
    deleteMany?:
      | TryoutHistoryScalarWhereInput
      | TryoutHistoryScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutTryoutHistoryInput = {
    create?: XOR<
      UserCreateWithoutTryoutHistoryInput,
      UserUncheckedCreateWithoutTryoutHistoryInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutTryoutHistoryInput;
    connect?: UserWhereUniqueInput;
  };

  export type PaketSoalCreateNestedOneWithoutTryoutHistoryInput = {
    create?: XOR<
      PaketSoalCreateWithoutTryoutHistoryInput,
      PaketSoalUncheckedCreateWithoutTryoutHistoryInput
    >;
    connectOrCreate?: PaketSoalCreateOrConnectWithoutTryoutHistoryInput;
    connect?: PaketSoalWhereUniqueInput;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type UserUpdateOneRequiredWithoutTryoutHistoryNestedInput = {
    create?: XOR<
      UserCreateWithoutTryoutHistoryInput,
      UserUncheckedCreateWithoutTryoutHistoryInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutTryoutHistoryInput;
    upsert?: UserUpsertWithoutTryoutHistoryInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutTryoutHistoryInput,
        UserUpdateWithoutTryoutHistoryInput
      >,
      UserUncheckedUpdateWithoutTryoutHistoryInput
    >;
  };

  export type PaketSoalUpdateOneRequiredWithoutTryoutHistoryNestedInput = {
    create?: XOR<
      PaketSoalCreateWithoutTryoutHistoryInput,
      PaketSoalUncheckedCreateWithoutTryoutHistoryInput
    >;
    connectOrCreate?: PaketSoalCreateOrConnectWithoutTryoutHistoryInput;
    upsert?: PaketSoalUpsertWithoutTryoutHistoryInput;
    connect?: PaketSoalWhereUniqueInput;
    update?: XOR<
      XOR<
        PaketSoalUpdateToOneWithWhereWithoutTryoutHistoryInput,
        PaketSoalUpdateWithoutTryoutHistoryInput
      >,
      PaketSoalUncheckedUpdateWithoutTryoutHistoryInput
    >;
  };

  export type PaketSoalCreateNestedOneWithoutSoalInput = {
    create?: XOR<
      PaketSoalCreateWithoutSoalInput,
      PaketSoalUncheckedCreateWithoutSoalInput
    >;
    connectOrCreate?: PaketSoalCreateOrConnectWithoutSoalInput;
    connect?: PaketSoalWhereUniqueInput;
  };

  export type PaketSoalUpdateOneRequiredWithoutSoalNestedInput = {
    create?: XOR<
      PaketSoalCreateWithoutSoalInput,
      PaketSoalUncheckedCreateWithoutSoalInput
    >;
    connectOrCreate?: PaketSoalCreateOrConnectWithoutSoalInput;
    upsert?: PaketSoalUpsertWithoutSoalInput;
    connect?: PaketSoalWhereUniqueInput;
    update?: XOR<
      XOR<
        PaketSoalUpdateToOneWithWhereWithoutSoalInput,
        PaketSoalUpdateWithoutSoalInput
      >,
      PaketSoalUncheckedUpdateWithoutSoalInput
    >;
  };

  export type EnumJenisMateriFieldUpdateOperationsInput = {
    set?: $Enums.JenisMateri;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role;
  };

  export type NestedEnumGradeFilter<$PrismaModel = never> = {
    equals?: $Enums.Grade | EnumGradeFieldRefInput<$PrismaModel>;
    in?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>;
    not?: NestedEnumGradeFilter<$PrismaModel> | $Enums.Grade;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>;
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRoleFilter<$PrismaModel>;
    _max?: NestedEnumRoleFilter<$PrismaModel>;
  };

  export type NestedEnumGradeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Grade | EnumGradeFieldRefInput<$PrismaModel>;
    in?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Grade[] | ListEnumGradeFieldRefInput<$PrismaModel>;
    not?: NestedEnumGradeWithAggregatesFilter<$PrismaModel> | $Enums.Grade;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumGradeFilter<$PrismaModel>;
    _max?: NestedEnumGradeFilter<$PrismaModel>;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type NestedEnumJenisMateriFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisMateri | EnumJenisMateriFieldRefInput<$PrismaModel>;
    in?: $Enums.JenisMateri[] | ListEnumJenisMateriFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.JenisMateri[]
      | ListEnumJenisMateriFieldRefInput<$PrismaModel>;
    not?: NestedEnumJenisMateriFilter<$PrismaModel> | $Enums.JenisMateri;
  };

  export type NestedEnumJenisMateriWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: $Enums.JenisMateri | EnumJenisMateriFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.JenisMateri[]
        | ListEnumJenisMateriFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.JenisMateri[]
        | ListEnumJenisMateriFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumJenisMateriWithAggregatesFilter<$PrismaModel>
        | $Enums.JenisMateri;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumJenisMateriFilter<$PrismaModel>;
      _max?: NestedEnumJenisMateriFilter<$PrismaModel>;
    };

  export type TryoutHistoryCreateWithoutUserInput = {
    id?: string;
    score: number;
    timeSpent: number;
    answers: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    paketSoal: PaketSoalCreateNestedOneWithoutTryoutHistoryInput;
  };

  export type TryoutHistoryUncheckedCreateWithoutUserInput = {
    id?: string;
    paketSoalId: string;
    score: number;
    timeSpent: number;
    answers: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type TryoutHistoryCreateOrConnectWithoutUserInput = {
    where: TryoutHistoryWhereUniqueInput;
    create: XOR<
      TryoutHistoryCreateWithoutUserInput,
      TryoutHistoryUncheckedCreateWithoutUserInput
    >;
  };

  export type TryoutHistoryCreateManyUserInputEnvelope = {
    data: TryoutHistoryCreateManyUserInput | TryoutHistoryCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type TryoutHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: TryoutHistoryWhereUniqueInput;
    update: XOR<
      TryoutHistoryUpdateWithoutUserInput,
      TryoutHistoryUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      TryoutHistoryCreateWithoutUserInput,
      TryoutHistoryUncheckedCreateWithoutUserInput
    >;
  };

  export type TryoutHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: TryoutHistoryWhereUniqueInput;
    data: XOR<
      TryoutHistoryUpdateWithoutUserInput,
      TryoutHistoryUncheckedUpdateWithoutUserInput
    >;
  };

  export type TryoutHistoryUpdateManyWithWhereWithoutUserInput = {
    where: TryoutHistoryScalarWhereInput;
    data: XOR<
      TryoutHistoryUpdateManyMutationInput,
      TryoutHistoryUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type TryoutHistoryScalarWhereInput = {
    AND?: TryoutHistoryScalarWhereInput | TryoutHistoryScalarWhereInput[];
    OR?: TryoutHistoryScalarWhereInput[];
    NOT?: TryoutHistoryScalarWhereInput | TryoutHistoryScalarWhereInput[];
    id?: StringFilter<'TryoutHistory'> | string;
    userId?: StringFilter<'TryoutHistory'> | string;
    paketSoalId?: StringFilter<'TryoutHistory'> | string;
    score?: IntFilter<'TryoutHistory'> | number;
    timeSpent?: IntFilter<'TryoutHistory'> | number;
    answers?: JsonFilter<'TryoutHistory'>;
    createdAt?: DateTimeFilter<'TryoutHistory'> | Date | string;
  };

  export type SoalCreateWithoutPaketSoalInput = {
    id?: string;
    pertanyaan: string;
    opsiA: string;
    opsiB: string;
    opsiC: string;
    opsiD: string;
    opsiE: string;
    jawabanBenar: string;
    pembahasan?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SoalUncheckedCreateWithoutPaketSoalInput = {
    id?: string;
    pertanyaan: string;
    opsiA: string;
    opsiB: string;
    opsiC: string;
    opsiD: string;
    opsiE: string;
    jawabanBenar: string;
    pembahasan?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SoalCreateOrConnectWithoutPaketSoalInput = {
    where: SoalWhereUniqueInput;
    create: XOR<
      SoalCreateWithoutPaketSoalInput,
      SoalUncheckedCreateWithoutPaketSoalInput
    >;
  };

  export type SoalCreateManyPaketSoalInputEnvelope = {
    data: SoalCreateManyPaketSoalInput | SoalCreateManyPaketSoalInput[];
    skipDuplicates?: boolean;
  };

  export type TryoutHistoryCreateWithoutPaketSoalInput = {
    id?: string;
    score: number;
    timeSpent: number;
    answers: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutTryoutHistoryInput;
  };

  export type TryoutHistoryUncheckedCreateWithoutPaketSoalInput = {
    id?: string;
    userId: string;
    score: number;
    timeSpent: number;
    answers: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type TryoutHistoryCreateOrConnectWithoutPaketSoalInput = {
    where: TryoutHistoryWhereUniqueInput;
    create: XOR<
      TryoutHistoryCreateWithoutPaketSoalInput,
      TryoutHistoryUncheckedCreateWithoutPaketSoalInput
    >;
  };

  export type TryoutHistoryCreateManyPaketSoalInputEnvelope = {
    data:
      | TryoutHistoryCreateManyPaketSoalInput
      | TryoutHistoryCreateManyPaketSoalInput[];
    skipDuplicates?: boolean;
  };

  export type SoalUpsertWithWhereUniqueWithoutPaketSoalInput = {
    where: SoalWhereUniqueInput;
    update: XOR<
      SoalUpdateWithoutPaketSoalInput,
      SoalUncheckedUpdateWithoutPaketSoalInput
    >;
    create: XOR<
      SoalCreateWithoutPaketSoalInput,
      SoalUncheckedCreateWithoutPaketSoalInput
    >;
  };

  export type SoalUpdateWithWhereUniqueWithoutPaketSoalInput = {
    where: SoalWhereUniqueInput;
    data: XOR<
      SoalUpdateWithoutPaketSoalInput,
      SoalUncheckedUpdateWithoutPaketSoalInput
    >;
  };

  export type SoalUpdateManyWithWhereWithoutPaketSoalInput = {
    where: SoalScalarWhereInput;
    data: XOR<
      SoalUpdateManyMutationInput,
      SoalUncheckedUpdateManyWithoutPaketSoalInput
    >;
  };

  export type SoalScalarWhereInput = {
    AND?: SoalScalarWhereInput | SoalScalarWhereInput[];
    OR?: SoalScalarWhereInput[];
    NOT?: SoalScalarWhereInput | SoalScalarWhereInput[];
    id?: StringFilter<'Soal'> | string;
    pertanyaan?: StringFilter<'Soal'> | string;
    opsiA?: StringFilter<'Soal'> | string;
    opsiB?: StringFilter<'Soal'> | string;
    opsiC?: StringFilter<'Soal'> | string;
    opsiD?: StringFilter<'Soal'> | string;
    opsiE?: StringFilter<'Soal'> | string;
    jawabanBenar?: StringFilter<'Soal'> | string;
    pembahasan?: StringNullableFilter<'Soal'> | string | null;
    paketSoalId?: StringFilter<'Soal'> | string;
    createdAt?: DateTimeFilter<'Soal'> | Date | string;
    updatedAt?: DateTimeFilter<'Soal'> | Date | string;
  };

  export type TryoutHistoryUpsertWithWhereUniqueWithoutPaketSoalInput = {
    where: TryoutHistoryWhereUniqueInput;
    update: XOR<
      TryoutHistoryUpdateWithoutPaketSoalInput,
      TryoutHistoryUncheckedUpdateWithoutPaketSoalInput
    >;
    create: XOR<
      TryoutHistoryCreateWithoutPaketSoalInput,
      TryoutHistoryUncheckedCreateWithoutPaketSoalInput
    >;
  };

  export type TryoutHistoryUpdateWithWhereUniqueWithoutPaketSoalInput = {
    where: TryoutHistoryWhereUniqueInput;
    data: XOR<
      TryoutHistoryUpdateWithoutPaketSoalInput,
      TryoutHistoryUncheckedUpdateWithoutPaketSoalInput
    >;
  };

  export type TryoutHistoryUpdateManyWithWhereWithoutPaketSoalInput = {
    where: TryoutHistoryScalarWhereInput;
    data: XOR<
      TryoutHistoryUpdateManyMutationInput,
      TryoutHistoryUncheckedUpdateManyWithoutPaketSoalInput
    >;
  };

  export type UserCreateWithoutTryoutHistoryInput = {
    id?: string;
    clerkId: string;
    email: string;
    name?: string | null;
    role?: $Enums.Role;
    grade?: $Enums.Grade;
    createdAt?: Date | string;
  };

  export type UserUncheckedCreateWithoutTryoutHistoryInput = {
    id?: string;
    clerkId: string;
    email: string;
    name?: string | null;
    role?: $Enums.Role;
    grade?: $Enums.Grade;
    createdAt?: Date | string;
  };

  export type UserCreateOrConnectWithoutTryoutHistoryInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutTryoutHistoryInput,
      UserUncheckedCreateWithoutTryoutHistoryInput
    >;
  };

  export type PaketSoalCreateWithoutTryoutHistoryInput = {
    id?: string;
    judul: string;
    deskripsi?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    soal?: SoalCreateNestedManyWithoutPaketSoalInput;
  };

  export type PaketSoalUncheckedCreateWithoutTryoutHistoryInput = {
    id?: string;
    judul: string;
    deskripsi?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    soal?: SoalUncheckedCreateNestedManyWithoutPaketSoalInput;
  };

  export type PaketSoalCreateOrConnectWithoutTryoutHistoryInput = {
    where: PaketSoalWhereUniqueInput;
    create: XOR<
      PaketSoalCreateWithoutTryoutHistoryInput,
      PaketSoalUncheckedCreateWithoutTryoutHistoryInput
    >;
  };

  export type UserUpsertWithoutTryoutHistoryInput = {
    update: XOR<
      UserUpdateWithoutTryoutHistoryInput,
      UserUncheckedUpdateWithoutTryoutHistoryInput
    >;
    create: XOR<
      UserCreateWithoutTryoutHistoryInput,
      UserUncheckedCreateWithoutTryoutHistoryInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutTryoutHistoryInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutTryoutHistoryInput,
      UserUncheckedUpdateWithoutTryoutHistoryInput
    >;
  };

  export type UserUpdateWithoutTryoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clerkId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateWithoutTryoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clerkId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    grade?: EnumGradeFieldUpdateOperationsInput | $Enums.Grade;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PaketSoalUpsertWithoutTryoutHistoryInput = {
    update: XOR<
      PaketSoalUpdateWithoutTryoutHistoryInput,
      PaketSoalUncheckedUpdateWithoutTryoutHistoryInput
    >;
    create: XOR<
      PaketSoalCreateWithoutTryoutHistoryInput,
      PaketSoalUncheckedCreateWithoutTryoutHistoryInput
    >;
    where?: PaketSoalWhereInput;
  };

  export type PaketSoalUpdateToOneWithWhereWithoutTryoutHistoryInput = {
    where?: PaketSoalWhereInput;
    data: XOR<
      PaketSoalUpdateWithoutTryoutHistoryInput,
      PaketSoalUncheckedUpdateWithoutTryoutHistoryInput
    >;
  };

  export type PaketSoalUpdateWithoutTryoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string;
    judul?: StringFieldUpdateOperationsInput | string;
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    soal?: SoalUpdateManyWithoutPaketSoalNestedInput;
  };

  export type PaketSoalUncheckedUpdateWithoutTryoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string;
    judul?: StringFieldUpdateOperationsInput | string;
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    soal?: SoalUncheckedUpdateManyWithoutPaketSoalNestedInput;
  };

  export type PaketSoalCreateWithoutSoalInput = {
    id?: string;
    judul: string;
    deskripsi?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tryoutHistory?: TryoutHistoryCreateNestedManyWithoutPaketSoalInput;
  };

  export type PaketSoalUncheckedCreateWithoutSoalInput = {
    id?: string;
    judul: string;
    deskripsi?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tryoutHistory?: TryoutHistoryUncheckedCreateNestedManyWithoutPaketSoalInput;
  };

  export type PaketSoalCreateOrConnectWithoutSoalInput = {
    where: PaketSoalWhereUniqueInput;
    create: XOR<
      PaketSoalCreateWithoutSoalInput,
      PaketSoalUncheckedCreateWithoutSoalInput
    >;
  };

  export type PaketSoalUpsertWithoutSoalInput = {
    update: XOR<
      PaketSoalUpdateWithoutSoalInput,
      PaketSoalUncheckedUpdateWithoutSoalInput
    >;
    create: XOR<
      PaketSoalCreateWithoutSoalInput,
      PaketSoalUncheckedCreateWithoutSoalInput
    >;
    where?: PaketSoalWhereInput;
  };

  export type PaketSoalUpdateToOneWithWhereWithoutSoalInput = {
    where?: PaketSoalWhereInput;
    data: XOR<
      PaketSoalUpdateWithoutSoalInput,
      PaketSoalUncheckedUpdateWithoutSoalInput
    >;
  };

  export type PaketSoalUpdateWithoutSoalInput = {
    id?: StringFieldUpdateOperationsInput | string;
    judul?: StringFieldUpdateOperationsInput | string;
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutHistory?: TryoutHistoryUpdateManyWithoutPaketSoalNestedInput;
  };

  export type PaketSoalUncheckedUpdateWithoutSoalInput = {
    id?: StringFieldUpdateOperationsInput | string;
    judul?: StringFieldUpdateOperationsInput | string;
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    tryoutHistory?: TryoutHistoryUncheckedUpdateManyWithoutPaketSoalNestedInput;
  };

  export type TryoutHistoryCreateManyUserInput = {
    id?: string;
    paketSoalId: string;
    score: number;
    timeSpent: number;
    answers: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type TryoutHistoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    timeSpent?: IntFieldUpdateOperationsInput | number;
    answers?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    paketSoal?: PaketSoalUpdateOneRequiredWithoutTryoutHistoryNestedInput;
  };

  export type TryoutHistoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    paketSoalId?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    timeSpent?: IntFieldUpdateOperationsInput | number;
    answers?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TryoutHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    paketSoalId?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    timeSpent?: IntFieldUpdateOperationsInput | number;
    answers?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SoalCreateManyPaketSoalInput = {
    id?: string;
    pertanyaan: string;
    opsiA: string;
    opsiB: string;
    opsiC: string;
    opsiD: string;
    opsiE: string;
    jawabanBenar: string;
    pembahasan?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type TryoutHistoryCreateManyPaketSoalInput = {
    id?: string;
    userId: string;
    score: number;
    timeSpent: number;
    answers: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type SoalUpdateWithoutPaketSoalInput = {
    id?: StringFieldUpdateOperationsInput | string;
    pertanyaan?: StringFieldUpdateOperationsInput | string;
    opsiA?: StringFieldUpdateOperationsInput | string;
    opsiB?: StringFieldUpdateOperationsInput | string;
    opsiC?: StringFieldUpdateOperationsInput | string;
    opsiD?: StringFieldUpdateOperationsInput | string;
    opsiE?: StringFieldUpdateOperationsInput | string;
    jawabanBenar?: StringFieldUpdateOperationsInput | string;
    pembahasan?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SoalUncheckedUpdateWithoutPaketSoalInput = {
    id?: StringFieldUpdateOperationsInput | string;
    pertanyaan?: StringFieldUpdateOperationsInput | string;
    opsiA?: StringFieldUpdateOperationsInput | string;
    opsiB?: StringFieldUpdateOperationsInput | string;
    opsiC?: StringFieldUpdateOperationsInput | string;
    opsiD?: StringFieldUpdateOperationsInput | string;
    opsiE?: StringFieldUpdateOperationsInput | string;
    jawabanBenar?: StringFieldUpdateOperationsInput | string;
    pembahasan?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SoalUncheckedUpdateManyWithoutPaketSoalInput = {
    id?: StringFieldUpdateOperationsInput | string;
    pertanyaan?: StringFieldUpdateOperationsInput | string;
    opsiA?: StringFieldUpdateOperationsInput | string;
    opsiB?: StringFieldUpdateOperationsInput | string;
    opsiC?: StringFieldUpdateOperationsInput | string;
    opsiD?: StringFieldUpdateOperationsInput | string;
    opsiE?: StringFieldUpdateOperationsInput | string;
    jawabanBenar?: StringFieldUpdateOperationsInput | string;
    pembahasan?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TryoutHistoryUpdateWithoutPaketSoalInput = {
    id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    timeSpent?: IntFieldUpdateOperationsInput | number;
    answers?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutTryoutHistoryNestedInput;
  };

  export type TryoutHistoryUncheckedUpdateWithoutPaketSoalInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    timeSpent?: IntFieldUpdateOperationsInput | number;
    answers?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TryoutHistoryUncheckedUpdateManyWithoutPaketSoalInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    timeSpent?: IntFieldUpdateOperationsInput | number;
    answers?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Aliases for legacy arg types
   */
  /**
   * @deprecated Use UserCountOutputTypeDefaultArgs instead
   */
  export type UserCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = UserCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use PaketSoalCountOutputTypeDefaultArgs instead
   */
  export type PaketSoalCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = PaketSoalCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use UserDefaultArgs instead
   */
  export type UserArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = UserDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use PaketSoalDefaultArgs instead
   */
  export type PaketSoalArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = PaketSoalDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use TryoutHistoryDefaultArgs instead
   */
  export type TryoutHistoryArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = TryoutHistoryDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use SoalDefaultArgs instead
   */
  export type SoalArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = SoalDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use MateriDefaultArgs instead
   */
  export type MateriArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = MateriDefaultArgs<ExtArgs>;

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
