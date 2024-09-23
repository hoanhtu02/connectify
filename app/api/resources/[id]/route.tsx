import WpStorage from "@/services/storage/WpStorage";
/**
    Retrieve a Media Item
    @access
    Arguments
    id	Unique identifier for the post.
    context	Scope under which the request is made; determines fields present in response.
    Default: view
    One of: view, embed, edit
    @access
    Definition
    `GET /wp/v2/media/<id>`
 * @param request 
 */
export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const file = await WpStorage.getFile(id);
    console.log(file);
    if (!file)
      return Response.json({ message: "Resource not found!" }, { status: 404 });
    const headers = new Headers();
    headers.set("Content-Type", file.type || "application/octet-stream");
    headers.set("Content-Disposition", `attachment; filename="${file.name}"`);

    return new Response(file.stream(), { headers, status: 201 });
  } catch (error: any) {
    return Response.json(
      { message: "Resource not found!", error },
      { status: 404 }
    );
  }
}
/**
  Update a Media Item
  @access 
  Arguments
    - id: Unique identifier for the media item.
    - date: The date the media item was published (in the site's timezone).
    - date_gmt: The date the media item was published (in GMT).
    - slug: An alphanumeric identifier unique to the media item.
    - status: The status of the media item. Possible values are:
        + publish: The item is published.
        + future: The item is scheduled for future publication.
        + draft: The item is in draft status.
        + pending: The item is pending review.
        + private: The item is private.
    - title: The title of the media item.
    - author: The ID of the author associated with the media item.
    - comment_status: The status of comments for the media item. Possible values are:
        + open: Comments are allowed.
        + closed: Comments are not allowed.
    - ping_status: Whether the media item can be pinged. Possible values are:
        + open: Pings are allowed.
        + closed: Pings are not allowed.
    - meta: Metadata fields for the media item.
    - template: The theme template to use for displaying the media item.
    - alt_text: Alternative text to display when the media item is not shown.
    - caption: The caption for the media item.
    - description: The description for the media item.
    - post: The ID of the associated post for this media item.
    @access
    Definition
        `POST /wp/v2/media/<id>`
*/
export async function POST(request: Request) {}
/**
    Delete a Media Item
    @access
    `Arguments`
    - id	Unique identifier for the post.
    - force	Whether to bypass Trash and force deletion.
    @access
    `Definition`
    `DELETE /wp/v2/media/<id>`
 * @param request 
 */
export async function DELETE(request: Request) {}
