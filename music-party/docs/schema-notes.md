# Schema notes

The original specification allowed one mapping per request or multiple candidates. We implemented **multiple candidate rows** with an `is_primary` boolean and a partial unique index to preserve one primary mapping while allowing alternatives for host review.

We also added `room_members.left_at` to support active-membership logic over time.
