import {ɵElement, ɵValue} from "@angular/forms";

export class Post {
  name!: ɵValue<ɵElement<string, null>> | undefined;
  occupation!: ɵValue<ɵElement<string, null>> | undefined;
  email!: ɵValue<ɵElement<string, null>> | undefined;
  bio!: ɵValue<ɵElement<string, null>> | undefined;

  constructor(name: ɵValue<ɵElement<string, null>> | undefined, occupation: ɵValue<ɵElement<string, null>> | undefined, email: ɵValue<ɵElement<string, null>> | undefined, bio: ɵValue<ɵElement<string, null>> | undefined) {
    this.name = name
    this.occupation = occupation
    this.email = email
    this.bio = bio
  }
}
