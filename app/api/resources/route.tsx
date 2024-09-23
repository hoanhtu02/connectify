import WpStorage from "@/services/storage/WpStorage";
/**
  Arguments
  
    - context: Scope under which the request is made; determines which fields are present in the response.
        + Default: "view"
        + Possible values:
          * view: Return the default view.
          * embed: Return an embedded view.
          * edit: Return the editable fields.
    
    - page: The current page of the collection to return.
        + Default: 1
    
    - per_page: Maximum number of items to be returned in the result set.
        + Default: 10
    
    - search: Limit results to those that match a specific string.

    - after: Limit response to posts published after a given ISO8601 compliant date.

    - modified_after: Limit response to posts modified after a given ISO8601 compliant date.

    - author: Limit result set to posts assigned to specific authors (by ID).
    
    - author_exclude: Ensure the result set excludes posts assigned to specific authors (by ID).

    - before: Limit response to posts published before a given ISO8601 compliant date.

    - modified_before: Limit response to posts modified before a given ISO8601 compliant date.

    - exclude: Ensure the result set excludes specific IDs.
    
    - include: Limit the result set to specific IDs.
    
    - offset: Offset the result set by a specific number of items.

    - order: Order the sort attribute in ascending or descending order.
        + Default: "desc"
        + Possible values: 
          * asc: Ascending order.
          * desc: Descending order.

    - orderby: Sort the collection by a specific post attribute.
        + Default: "date"
        + Possible values:
          * author: Sort by author ID.
          * date: Sort by post date.
          * id: Sort by post ID.
          * include: Sort by specific IDs.
          * modified: Sort by last modified date.
          * parent: Sort by parent post ID.
          * relevance: Sort by relevance.
          * slug: Sort by slug.
          * include_slugs: Sort by included slugs.
          * title: Sort by post title.

    - parent: Limit result set to items with specific parent IDs.

    - parent_exclude: Limit result set to all items except those with a particular parent ID.

    - search_columns: Array of column names to search through.

    - slug: Limit the result set to posts with one or more specific slugs.

    - status: Limit the result set to posts assigned one or more specific statuses.
        + Default: "inherit"

    - media_type: Limit the result set to attachments of a specific media type.
        + Possible values:
          * image: Only return image attachments.
          * video: Only return video attachments.
          * text: Only return text attachments.
          * application: Only return application attachments.
          * audio: Only return audio attachments.

    - mime_type: Limit the result set to attachments of a particular MIME type.
    @access
    Definition
    `GET /wp/v2/media`
*/
export async function GET(request: Request) {}

/**
  Create Media Items

  Arguments

    - date: The date the media item was published, in the site's timezone.

    - date_gmt: The date the media item was published, in GMT.

    - slug: An alphanumeric identifier for the media item, unique to its type.

    - status: The status of the media item.
        + Possible values:
          * publish: The media item is published.
          * future: The media item is scheduled to be published in the future.
          * draft: The media item is in draft status.
          * pending: The media item is pending review.
          * private: The media item is private.

    - title: The title for the media item.

    - author: The ID of the author of the media item.

    - comment_status: Whether or not comments are open for the media item.
        + Possible values:
          * open: Comments are allowed.
          * closed: Comments are not allowed.

    - ping_status: Whether or not the media item can be pinged.
        + Possible values:
          * open: Pings are allowed.
          * closed: Pings are not allowed.

    - meta: Meta fields for the media item.

    - template: The theme file to use for displaying the media item.

    - alt_text: Alternative text to display when the attachment is not shown.

    - caption: The caption for the attachment.

    - description: The description for the attachment.

    - post: The ID of the associated post of the attachment.
    @access
    Definition
    `POST /wp/v2/media`
*/
export async function POST(request: Request) {
  try {
    // const referer =
    //   request.headers.get("referer") ?? request.headers.get("origin");

    // if (!referer ?? !referer?.includes("yourdomain.com")) {
    //   return Response.json({ message: "Not allow origin!" }, { status: 403 });
    // }
    const { files } = await request.json();
    await WpStorage.uploadFile(files as File[]);
  } catch (error: any) {
    return Response.json({ message: "Upload failed!", error }, { status: 400 });
  }
}
